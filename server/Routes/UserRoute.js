const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, name, username, password } = req.body;
    if (!email || !name || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use." });

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email,
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        username: newUser.username,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    jwt.sign(
      { email: user.email, id: user._id },
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Error generating token" });
        }
        res.json({
          message: "Login successful",
          token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
          },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;
