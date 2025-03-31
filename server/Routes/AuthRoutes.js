const express = require("express");
const passport = require("passport");
const { generateToken } = require("../Config/Passport");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.ENDPOINT,
    failureRedirect: `${process.env.ENDPOINT}/login`,
  })
);

router.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Logout Route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("token");
    res.redirect("/");
  });
});

module.exports = router;
