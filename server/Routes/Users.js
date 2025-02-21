const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

router.get("/", (req, res) => {
  res.send("Welcome home 🏠");
});

router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.create({
      email,
      name,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
