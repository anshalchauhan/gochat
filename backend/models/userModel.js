// A module for creating random strings and performing hashing, encryption, decryption
const crypto = require("crypto");

// Mongoose is an object modeling tool for MongoDB and Node.js
const mongoose = require("mongoose");

// A library of string validators and sanitizers.
const validator = require("validator");

// A library to help hash passwords
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  nickName: String,
  about: String,
  avatar: {
    type: String,
    default: "https://gochat-application.s3.ap-south-1.amazonaws.com/user.png",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    select: false,
  },
  otpExpires: Date,
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "PasswordConfirm is required"],
    validate: {
      // This only works on Create and on SAVE!!!
      validator: function (el) {
        return el === this.password; // passwordConfirm === password
      },
      message: "Passwords are not the same!",
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: Date,
  updatedAt: Date,
  socketId: String,
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["Online", "Offline"],
  },
});

// Middlewares

// Middleware to encrypt user's Password before saving it to the database and also deleting the passwordConfirm field.
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Encrypting or hashing password with a cost of 12
  this.password = await bcryptjs.hash(this.password, 12);

  // // Deleting passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

// Middleware to encrypt user's OTP before saving it to the database
userSchema.pre("save", async function (next) {
  // Only run this function is otp was actually modified
  if (!this.isModified("otp")) return next();

  // Encrypting or hashing otp with a cost of 12
  this.otp = await bcryptjs.hash(this.otp, 12);

  next();
});

// Middleware to save passwordChangedAt Date
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // Subtracting 1000ms or 1s from Date.now() because there is a posibility that token is generated before passwordChangedAt is updated
  this.passwordChangedAt = Date.now() - 1000;
});

// Instance Methods

// Method to check if the entered Password is correct during Login
userSchema.methods.correctPassword = async function (
  enteredPassword,
  password
) {
  // this keyword not available because we have set password field to false.
  return await bcryptjs.compare(enteredPassword, password);
};

// Method to check if the entered OTP is correct
userSchema.methods.correctOtp = async function (enteredOtp, otp) {
  // this keyword not available because we have set otp field to false.
  return await bcryptjs.compare(enteredOtp, otp);
};

// Method to check if the user has changed his/her password after receiving the token
userSchema.methods.changedPassword = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedPasswordTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedPasswordTimestamp;
  }

  return false;
};

// Method for generating the random reset token
userSchema.methods.createPasswordResetToken = function () {
  // not necessary to be as strong as the normal token
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
