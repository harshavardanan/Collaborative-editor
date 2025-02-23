const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email address",
      ],
    },
    name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true }, // Keep sparse for unique username handling
    password: { type: String, required: true },
    profilePicture: { type: String },
    provider: { type: String },
    providerId: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true } // This will auto-create `createdAt` and `updatedAt` fields
);

// Password hashing before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash password if it's new or modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Creating the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
