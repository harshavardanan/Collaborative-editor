const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profilePicture: { type: String }, // Optional, depending on the provider
  provider: { type: String, required: true }, // E.g., 'google', 'microsoft', etc.
  providerId: { type: String, required: true }, // The ID provided by the external provider
  role: { type: String, default: "user" }, // You can use roles like 'admin', 'user', etc.
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
