const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
const socketIo = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./Users");

const connectSocket = () => {
  const io = socketIo(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("editing", ({ room, data }) => {
      socket.to(room).emit("editing", data);
    });

    socket.on("join-room", ({ room }) => {
      const user = addUser({ id: socket.id, room });

      if (!user) return;

      socket.join(room);

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
};

module.exports = connectSocket;
