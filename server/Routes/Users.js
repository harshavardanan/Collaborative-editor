const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.create({
      email,
      name,
    });
    res.status(200).json(user).json("user saved");
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
