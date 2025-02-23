const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");


// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  try {
    const { email, name, username, password } = req.body;
    if (!email || !name || !username || !password) {
      return res.status(400).json({ message: "Email and name are required" });
    }
    const user = new User({ email, name, username, password });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
