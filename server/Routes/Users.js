const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get("/", (req, res) => {
  res.send("Welcome home 🏠");
});

module.exports = router;
