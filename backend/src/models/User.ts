import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Role } from "../constants/constants";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role), // Ensures only "user" or "admin"
      required: true,
      default: Role.USER, // Optional: Set default role
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      match: /^\+?\d{10,15}$/,
    },
    birthYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
  { timestamps: true }
);

// Index for faster email queries
// UserSchema.index({ email: 1 });

//This method ensures that the password is stripped out before the document is converted to JSON and returned to the client.
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
