const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const socketConnect = require("./SocketConfig");
const connectDB = require("./DB");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/register", require("./Routes/Users"));

socketConnect(server, cors);
connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
