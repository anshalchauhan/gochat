// Mongoose is an object modeling tool for MongoDB and Node.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      to: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      text: String,
      file: String,
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
