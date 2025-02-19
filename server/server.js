const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./Users");

app.use(cors());

const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("editing", (data) => {
    socket.broadcast.emit("editing", data);
  });
  socket.on("join-room", ({ room }) => {
    const user = addUser({
      id: socket.id,
      room,
    });
    io.to(user.room).emit("user-joiner", {
      userId: user.id,
      message: `User ${user.id} joined the room`,
    });
    io.to(user.room).emit("room-data", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    console.log(`User ${user.id} joined room ${user.room}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Database connected successfully"));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
