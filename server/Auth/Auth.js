const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) =>
  res.redirect("/dashboard")
);

// GitHub Auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/github/callback", passport.authenticate("github"), (req, res) =>
  res.redirect("/dashboard")
);

// Microsoft Auth
router.get(
  "/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);
router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft"),
  (req, res) => res.redirect("/dashboard")
);

// Apple Auth
router.get(
  "/apple",
  passport.authenticate("apple", { scope: ["name", "email"] })
);
router.get("/apple/callback", passport.authenticate("apple"), (req, res) =>
  res.redirect("/dashboard")
);

module.exports = router;
