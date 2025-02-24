const express = require("express");
const passport = require("passport");
const { generateToken } = require("../Config/Passport"); // Import token generator function

const router = express.Router();

// Google Auth - Redirect user to Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Auth Callback - Handles Google's response
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user); // Generate JWT token
    res.cookie("token", token, { httpOnly: true }); // Store in cookie
    res.redirect("/dashboard"); // Redirect user after login
  }
);

// GitHub Auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  }
);

// Microsoft Auth
router.get(
  "/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  }
);

// Apple Auth
router.get(
  "/apple",
  passport.authenticate("apple", { scope: ["name", "email"] })
);

router.post(
  "/apple/callback",
  passport.authenticate("apple", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  }
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("token");
    res.redirect("/");
  });
});

module.exports = router;
