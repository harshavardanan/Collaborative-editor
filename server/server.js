const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const artist = require("consoleartist");
const PORT = process.env.PORT || 5000;

app.use(cors());
const io = require("socket.io")(http, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(artist.green(`User connected: ${socket.id}`));
});
http.listen(PORT, () => {
  console.log(artist.cyan("Server is running on port " + PORT));
});
