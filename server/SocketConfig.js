// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");
// app.use(cors());
const socketIo = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./Users");

const connectSocket = (server, cors) => {
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

// const socketIo = require("socket.io");
// const { addUser, removeUser, getUser, getUsersInRoom } = require("./Users");

// const connectSocket = (server) => {
//   const io = socketIo(server, { cors: { origin: "*" } }); // Initialize `io` with the `server`

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     socket.on("editing", ({ room, data }) => {
//       console.log(`Editing event received in room ${room}`);
//       socket.to(room).emit("editing", data);
//     });

//     socket.on("join-room", ({ room }) => {
//       console.log(`User ${socket.id} is joining room ${room}`);
//       const user = addUser({ id: socket.id, room });

//       if (!user) return;

//       socket.join(room);

//       io.to(user.room).emit("user-joiner", {
//         userId: user.id,
//         message: `User ${user.id} joined the room`,
//       });

//       io.to(user.room).emit("room-data", {
//         room: user.room,
//         users: getUsersInRoom(user.room),
//       });

//       console.log(`User ${user.id} joined room ${user.room}`);
//     });

//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);
//       removeUser(socket.id); // Remove the user when they disconnect
//       io.to(user.room).emit("room-data", {
//         room: user.room,
//         users: getUsersInRoom(user.room),
//       });
//     });
//   });
// };

// module.exports = connectSocket;
