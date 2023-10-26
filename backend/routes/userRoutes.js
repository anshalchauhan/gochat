// Web Framework for Node.js
const express = require("express");

// Requiring Authorization Controller
const authController = require("../controllers/authController");

// Requring User Controller
const userController = require("../controllers/userController");

// Importing AWS s3 to uplaod and access profile pictures
const s3 = require("../../s3");

// user Router
const router = express.Router();

// Following REST architecture
router.get("/get-users", authController.protect, userController.getUsers);
router.get("/get-friends", authController.protect, userController.getFriends);
router.get(
  "/get-friend-requests",
  authController.protect,
  userController.getFriendRequests
);
router.patch("/update-me", authController.protect, userController.updateMe);

//AWS
router.get("/s3-url", authController.protect, s3.generateUploadURL);

// ZegoCloud
router.get(
  "/generate-zego-token",
  authController.protect,
  userController.generateZegoToken
);

module.exports = router;
