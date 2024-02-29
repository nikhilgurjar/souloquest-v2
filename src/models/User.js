import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    phoneNumber: String,
    about: {
      type: String,
      maxlength: 500,
    },
    country: String,
    city: String,
    state: String,
    profilePic: {
      type: String,
      default: process.env.PROFILE_PICTURE_DEFAULT,
    },
    role: {
      type: [String],
      default: ["Customer"], // Assuming ROLES is a variable containing role names
    },
    isGinie: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    destinations: [String],
    ginieType: {
      type: String,
      enum: ["global", "local"],
      default: "local",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    company: {
      name: String,
      role: String,
      from: Date,
      to: Date,
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      linkedin: String,
      twitter: String,
    },
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
  },
  { collection: "User", timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
