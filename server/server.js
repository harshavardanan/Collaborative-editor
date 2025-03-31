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
const session = require("express-session");

app.use(
  cors({
    origin: process.env.ENDPOINT,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, 
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/", require("./Routes/UserRoute"));
app.use("/", require("./Routes/AuthRoutes"));
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.send("welcome to server");
});
app.get("/user", (req, res) => {
  console.log("Session Data:", req.session);
  console.log("User Data:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized, please log in" });
  }

  res.json({ message: `Hello ${req.user.displayName}`, user: req.user });
});

socketConnect(server, cors);
connectDB();
console.log(process.env.ENDPOINT);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
