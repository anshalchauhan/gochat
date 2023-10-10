// Web Framework for Node.js
const express = require("express");

// Requiring Authorization Controller
const authController = require("../controllers/authController");

// user Router
const router = express.Router();

// Not following REST architecture
// Auth
router.post("/register", authController.register, authController.sendOTP);
router.post("/send-otp", authController.sendOTP);
router.patch("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);
router.patch(
  "/update-password",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
