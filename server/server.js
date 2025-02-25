const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const socketConnect = require("./SocketConfig");
const connectDB = require("./DB");
const dotenv = require("dotenv").config();
const passport = require("passport");
require("./Config/Passport");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api/", require("./Routes/UserRoute"));
app.use("/", require("./Routes/AuthRoutes"));

socketConnect(server, cors);
connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
