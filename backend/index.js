// http module to create an http server
const http = require("http");

// Path module provides utilities for working with file and directory paths
const path = require("path");

// Dotenv loads environment variables from a .env file into process.env.
const dotenv = require("dotenv");

// Mongoose is an object modeling tool for MongoDB and Node.js
const mongoose = require("mongoose");

// Socket.io
const { Server } = require("socket.io");

// userModel Schema
const User = require("./models/userModel");

// friendRequestModel Schema
const FriendRequest = require("./models/friendRequestModel");

// messageModel Schema
const Message = require("./models/messageModel");

// AudioCallModel Schema
// const AudioCall = require("./models/audioCallModel");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "../config.env" });

// Requring app module
const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Creating the DB string
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

// Start server
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//////Socket.io/////////

// Listen for when the client connects via socket.io-client
io.on("connection", async (socket) => {
  // console.log(JSON.stringify(socket.handshake.query));
  // console.log(socket);

  const socketId = socket.id;

  const { userId } = socket.handshake.query;

  console.log(`User connected ${socketId}`);

  if (userId.match(/^[0-9a-fA-F]{24}$/)) {
    await User.findByIdAndUpdate(userId, { socketId, status: "Online" });
  }

  // Event Listeners....
  // socket.on listening to events coming from client
  socket.on("friend_request", async (data) => {
    // console.log(data);

    // data = {to,from}

    const to = await User.findById(data.to).select("socketId");
    const from = await User.findById(data.from).select("socketId");

    // TODO: Create a friend request

    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });

    // emit an event => "new friend request"
    io.to(to?.socketId).emit("new_friend_request", {
      //
      message: "New Friend Request Received",
    });

    // emit event => "request_sent"
    io.to(from?.socketId).emit("request_sent", {
      //
      message: "Request sent successfully!",
    });
  });

  socket.on("accept_request", async (data) => {
    // console.log(data);

    // requestId
    const requestDoc = await FriendRequest.findById(data.requestId);

    const sender = await User.findById(requestDoc.sender);
    const receiver = await User.findById(requestDoc.recipient);

    // If sender is already a friend
    const isAlreadyAFriend = receiver?.friends.filter(
      (id) => id.toString() === requestDoc?.sender?.toString()
    );

    if (isAlreadyAFriend.length !== 0) {
      await FriendRequest.findByIdAndDelete(data.requestId);

      io.to(receiver?.socketId).emit("friend_exist", {
        message: `${receiver.firstName} ${receiver.lastName} is already a Friend!`,
      });

      return;
    }

    sender?.friends.push(requestDoc.recipient);
    receiver?.friends.push(requestDoc.sender);

    await sender.save({ new: true, validateModifiedOnly: true });
    await receiver.save({ new: true, validateModifiedOnly: true });

    await FriendRequest.findByIdAndDelete(data.requestId);

    io.to(sender?.socketId).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
    io.to(receiver?.socketId).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });

  // Emitting get_direct_conversation from client and listening it here
  socket.on(
    "get_single_chat_conversations",
    async ({ userId: userid }, callback) => {
      const existingConversations = await Message.find({
        participants: { $all: [userid] },
      }).populate(
        "participants",
        "firstName lastName _id email status avatar about"
      );

      console.log(existingConversations);
      callback(existingConversations);
    }
  );

  // socket.on("get_messages", async (data, callback) => {
  //   const { messages } = await Message.findById(data.conversationId).select(
  //     "messages"
  //   );

  //   callback(messages);
  // });

  socket.on("start_conversation", async (data) => {
    // data: {to, from}
    const { to, from } = data;
    // check if there is any existing conversation between these users
    const existingConversations = await Message.find({
      participants: { $size: 2, $all: [to, from] },
    }).populate(
      "participants",
      "firstName lastName _id email status avatar about"
    );

    // console.log(existingConversations[0], "Existing Conversation");

    // If no exisiting conversation
    if (existingConversations.length === 0) {
      let newChat = await Message.create({
        participants: [to, from],
      });

      newChat = await Message.findById(newChat._id).populate(
        "participants",
        "firstName lastName _id email status avatar about"
      );

      // console.log(newChat);
      socket.emit("start_chat", newChat);
    }

    // If there is an exisiting conversation
    else {
      socket.emit("start_chat", existingConversations[0]);
    }
  });

  // Listener to get all messages for a particular conversation
  socket.on("get_messages", async (data, callback) => {
    const { messages } = await Message.findById(data.conversationId)
      .select("messages")
      .then((res) => {
        return res ? res : {};
      });

    callback(messages);
  });

  // Handle text and link message
  socket.on("text_message", async (data) => {
    console.log("Received Message", data);
    // data: {to, from ,message, conversationId, type}
    const { to, from, message, conversationId, type } = data;

    // To get the socketId of to, we will fetch the user
    const toUser = await User.findById(to);
    const fromUser = await User.findById(from);

    // Create new message
    const newMessage = {
      to,
      from,
      type,
      text: message,
      createdAt: Date.now(),
    };

    // Fetch the conversation if it doesn't exist yet or add new message to the messages list
    const conversation = await Message.findById(conversationId);
    conversation.messages.push(newMessage);
    // save to db
    await conversation.save({});

    // emit new message -> to user

    // TODO: Put ?.socketId
    io.to(toUser?.socketId).emit("new_message", {
      conversationId,
      message: newMessage,
    });
    // emit new message -> from user
    io.to(fromUser?.socketId).emit("new_message", {
      conversationId,
      message: newMessage,
    });
  });

  // Handle media and file message
  socket.on("file_message", (data) => {
    // console.log("Received Message", data);

    // data: {to, from, text, file}

    // get the file extension
    const fileExtension = path.extname(data.file.name);

    // generate a unique filename
    const fileName = `${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}}${fileExtension}`;

    console.log(fileName);

    // upload file to AWS s3

    // Create a new conversation if it doesn't exist yet or add new message to the messages list

    // save to db

    // emit incoming message -> to user

    // emit outgoing_message -> from user
  });

  // -------------- HANDLE CALL SOCKET EVENTS ---------------------

  // out-going-voice-call
  socket.on("outgoing-voice-call", async (data) => {
    // Destructuring Data
    const { to, from, callType, roomId } = data;

    // To get the socketId of to, we will fetch the user
    const toUser = await User.findById(to);

    // Emitting event to the to user
    io.to(toUser?.socketId).emit("incoming-voice-call", {
      from,
      roomId,
      callType,
    });
  });

  // reject-voice-call
  socket.on("reject-voice-call", async (data) => {
    // Destructuring Data
    const { from } = data;

    // To get the socketId of from, we will fetch the user
    const fromUser = await User.findById(from);

    io.to(fromUser?.socketId).emit("voice-call-rejected");
  });

  // out-going-video-call
  socket.on("outgoing-video-call", async (data) => {
    // Destructuring Data
    const { to, from, callType, roomId } = data;

    // To get the socketId of to, we will fetch the user
    const toUser = await User.findById(to);

    // Emitting event to the to user
    io.to(toUser?.socketId).emit("incoming-video-call", {
      from,
      roomId,
      callType,
    });
  });

  // reject-video-call
  socket.on("reject-video-call", async (data) => {
    // Destructuring Data
    const { from } = data;

    // To get the socketId of from, we will fetch the user
    const fromUser = await User.findById(from);

    io.to(fromUser?.socketId).emit("video-call-rejected");
  });

  // accept-incoming-call (for both voice and video call)
  socket.on("accept-incoming-call", async ({ id }) => {
    const user = await User.findById(id);
    io.to(user?.socketId).emit("accept-call");
  });

  // HANDLE SOCKET DICONNECTION
  socket.on("end", async (data) => {
    // Find user by _id and set the status to Offline
    if (data.userId) {
      await User.findByIdAndDelete(data.userId, { status: "Offline" });
    }

    // TODO: Broadcast user disconnected
    // console.log("Closing connection");
    socket.disconnect(0);
  });
});

////////////////////////

// Handling Unhanlded Rejections
process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// module.exports = {
//   io,
// };
