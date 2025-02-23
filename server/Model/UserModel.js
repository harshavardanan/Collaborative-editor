const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true },
    password: { type: String, required: true }, // `sparse: true` avoids duplicate null errors
    profilePicture: { type: String },
    provider: { type: String },
    providerId: { type: String },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
