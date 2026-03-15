import { io } from "socket.io-client";

// This connects your frontend to the Django backend socket
const socket = io("http://localhost:8000", {
  transports: ["websocket"],
});

export default socket;