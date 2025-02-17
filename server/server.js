const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());

const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("editing", (data) => {
    socket.broadcast.emit("editing", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
