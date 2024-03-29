// Requiring util module to get promisify function
const { promisify } = require("util");

// A module for creating random strings and performing hashing, encryption, decryption
const crypto = require("crypto");

// Library to implement JSON Web Tokens
const jwt = require("jsonwebtoken");

// OTP Generator
const otpGenerator = require("otp-generator");

// userModel Schema
const User = require("../models/userModel");

// catchAsync function to handle catch blocks, we will wrap all our handler(controller) functions in this
const catchAsync = require("../utils/catchAsync");

// Error class
const AppError = require("../utils/appError");

// Filter Object
const filterObj = require("../utils/filterObject");

// Send Email
const sendEmail = require("../services/sendEmail");

// ----------JWT----------

// Function to signing or creating JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Sending JWT token to user
const sendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password confidential fields like passwords and OTPs
  user.password = undefined;
  user.otp = undefined;
  user.otpExpires = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
    message,
  });
};

// ----------Authentication Controllers----------

// Register
exports.register = catchAsync(async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password"
  );

  // Adding passwordConfirm field like this becuase nowdays it's not adivsed to put confirm password field on the signup page
  filteredBody.passwordConfirm = filteredBody.password;

  let user = await User.findOne({ email });

  // 1> Check if the user already exists and also verified
  if (user && user.verified)
    return next(new AppError("Email is already in use, Please login.", 400));
  // 2> If email is registerd but not verified
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.passwordConfirm = password;
    await user.save();

    req.user = user;
    // Putting return in front of next(), because we never send 2 responses from 1 handler
    return next();
  }
  // 3> If it's a new User
  user = await User.create(filteredBody);
  req.user = user;
  // As it is the last next() call we will not put return in front of it
  next();
});

// Sending OTP
exports.sendOTP = catchAsync(async (req, res, next) => {
  // 1> Create otp and otpExpires
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // 10 mins after OTP is send
  const otpExpires = Date.now() + 10 * 60 * 1000;

  // 2> Save the otp and otpExpires in the user database
  const user = await User.findById(req.user._id);
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save({ validateBeforeSave: false });

  // 3> Send them Email to user
  const subject = "OTP Verification ";
  const message = {
    name: user.firstName,
    otp,
  };

  try {
    const Options = {
      email: user.email,
      emailType: "otp",
      subject,
      message,
    };

    await sendEmail(Options);
    res.status(200).json({
      status: "success",
      email: user.email,
      message: "OTP Sent Successfully!",
    });
  } catch (err) {
    return next(
      new AppError(
        // err.message,
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

// Verifying OTP
exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  // 1> Check if user exists and the OTP has not expired
  const user = await User.findOne({
    email,
    otpExpires: { $gt: Date.now() },
  }).select("+otp");

  if (!user) return next(new AppError("Email is Invalid or OTP expired.", 400));

  // 2> Verify OTP
  if (!(await user.correctOtp(otp, user.otp)))
    return next(new AppError("Incorrect OTP.", 400));

  // 3> If everything is checked verify the user
  user.verified = true;
  const message = "Verification Successful";

  await user.save({ new: true, validateModifiedOnly: true });

  // 4> If everything is checked send JWT token to the user
  sendToken(user, 200, res, message);
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1> Check if email and password exist
  if (!email || !password)
    return new AppError("Please provide email and password", 400);

  // 2> Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect Email or Password", 401));

  // 3> Check if email is verified
  if (!user.verified) return next(new AppError("Email is not verified", 401));

  const message = "Login Successful!";

  // 4> If everything is checked send JWT token to the user
  sendToken(user, 200, res, message);
});

// Protect
exports.protect = catchAsync(async (req, res, next) => {
  // 1> Getting token and checking if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2> Verify Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3> Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4> Check if user changed password after the token was issued
  if (user.changedPassword(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed their password! Please log in again",
        401
      )
    );
  }

  // Grant access to protected route
  req.user = user; // this data will be usefull in future so we send user data in req
  next();
});

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1> Get user based on Posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }
  // 2> Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3> Send it to user's email
  const resetURL = `http://localhost:3001/auth/new-password?token=${resetToken}`;

  const subject = "Reset your GoChat password";

  const message = {
    name: user.firstName,
    link: resetURL,
  };

  try {
    const Options = {
      email: user.email,
      emailType: "resetPassword",
      subject,
      message,
    };

    await sendEmail(Options);

    res.status(200).json({
      status: "success",
      message: "Reset Password link sent to Email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        // err.message,
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1> Get user based on the token, encrypt the resetToken again so to compare with the passwordResetToken
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2> If token has not expired, and there is user, set then new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const message = "Password Updated!";

  // 3> Update changedPasswordAt property for the user
  // Middleware has been implemented

  // 4> Log the user in, send JWT
  sendToken(user, 200, res, message);
});

// Update Password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1> Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2> Check if Posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Current Password is wrong!", 401));
  }

  // 3> If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  const message = "Password Updated!";
  // User.findByIdAndUpdate will not work here because we are using many pre "save" middlewares

  // 4> Log user in, sendJWT
  sendToken(user, 200, res, message);
});
