const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token
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

// GET all users (Protected)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Register a new user and issue JWT
router.post("/register", async (req, res) => {
  try {
    const { email, name, username, password } = req.body;

    if (!email || !name || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT Token
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

// User Login (Returns JWT)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    // const user = await User.findOne({ email: "harsh@gmail.com" });
    // const isMatched = await bcrypt.compare("qwertyuiop", user.password);
    // console.log("password matched:", isMatched);
    if (!user) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
