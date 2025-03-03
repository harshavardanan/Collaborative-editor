const socketIo = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./Users");
const roomEditorState = {};
const connectSocket = (server, cors) => {
  const io = socketIo(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("editing", ({ room, data }) => {
      socket.to(room).emit("editing", data);
    });

    socket.on("join-room", ({ name, room }) => {
      const user = addUser({ id: socket.id, name, room });

      if (!user) return;
      socket.emit("message", {
        user: user.name,
        message: `Welcome to room ${user.room}`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has joined!`,
      });
      socket.join(room);

      socket.on("editing", ({ room, data }) => {
        roomEditorState[room] = data;

        io.to(room).emit("editing", data);
      });

      socket.on("fetch-editor-state", ({ room }) => {
        // Send the current editor state for the room to the requesting user
        if (roomEditorState[room]) {
          socket.emit("editor-state", roomEditorState[room]);
        } else {
          socket.emit("editor-state", "");
        }
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
};

module.exports = connectSocket;
