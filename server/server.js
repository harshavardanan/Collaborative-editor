const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

const connectDB = require("./DB");
app.use(cors());
app.use("/", require("./Routes/Users"));
const socketConnect = require("./SocketConfig");

socketConnect(server);
connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
