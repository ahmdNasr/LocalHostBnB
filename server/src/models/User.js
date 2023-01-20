const mongoose = require("mongoose");

const avatarPlaceHolder =
  "https://hszteam.de/wp-content/uploads/2021/01/avatar-placeholder.gif";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String, default: avatarPlaceHolder },
    bio: { type: String, default: "Hi, I am using LocalHost!" },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    ratingsByHosts: [
      {
        ratedAt: Number,
        stars: { type: Number, min: 0, max: 5 },
        message: { type: String, required: true },
        ratedBy: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
