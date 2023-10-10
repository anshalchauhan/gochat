import { io } from "socket.io-client";

let socket = null;

const connectSocket = (userId) => {
  socket = io("https://gochat-server.vercel.app", {
    query: `userId=${userId}`,
  });
};

export { socket, connectSocket };
