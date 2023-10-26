import { io } from "socket.io-client";
import { BASE_URL } from "./config";

let socket = null;

const connectSocket = (userId) => {
  socket = io(BASE_URL, {
    query: `userId=${userId}`,
  });
};

export { socket, connectSocket };
