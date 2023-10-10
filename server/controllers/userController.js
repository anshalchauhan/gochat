// userModel Schema
const User = require("../models/userModel");

// friendRequestModel Schema
const FriendRequest = require("../models/friendRequestModel");

// catchAsync function to handle catch blocks, we will wrap all our handler(controller) functions in this
const catchAsync = require("../utils/catchAsync");

// Error class
const AppError = require("../utils/appError");

// Filter Object
const filterObj = require("../utils/filterObject");

// ZegoCloud
const { generateToken04 } = require("../zego/zegoServerAssistant");

// ----------User Controllers----------

// user

// Get all users
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({
    verified: true,
  }).select("firstName lastName avatar _id");

  const thisUser = req.user;

  const remainingUsers = users.filter(
    (user) =>
      !thisUser.friends.includes(user._id) &&
      user._id.toString() !== req.user._id.toString()
  );

  res.status(200).json({
    status: "success",
    results: remainingUsers.length,
    data: remainingUsers,
    message: "Users found successfully!",
  });
});

// Get friends
exports.getFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate(
    "friends",
    "_id firstName lastName avatar"
  );

  res.status(200).json({
    status: "success",
    data: user.friends,
    message: "Friends found successfully!",
  });
});

// Get friend requests
exports.getFriendRequests = catchAsync(async (req, res, next) => {
  const requests = await FriendRequest.find({
    recipient: req.user._id,
  }).populate("sender", "_id firstName lastName avatar");

  res.status(200).json({
    status: "success",
    data: requests,
    message: "Friends requests found successfully!",
  });
});

// Update user
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1> Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updatePassword.",
        400
      )
    );
  }

  // 2> filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "nickName", "about", "avatar");

  // 3> Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

// ZegoCloud VoiceCall and VideoCall

// Token Generation
exports.generateZegoToken = catchAsync(async (req, res, next) => {
  const appId = parseInt(process.env.ZEGO_APP_ID);
  const serverSecret = process.env.ZEGO_SERVER_SECRET;
  const userId = req?.user?._id.toString();
  const effectiveTime = 3600;
  const payload = "";

  if (appId && serverSecret && userId) {
    const token = generateToken04(
      appId,
      userId,
      serverSecret,
      effectiveTime,
      payload
    );

    res.status(200).json({
      status: "success",
      message: "Token generated successfully",
      token,
    });
  } else {
    return next(
      new AppError("User id, App id and Server secret is required!", 400)
    );
  }
});
