import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as z from "zod";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
  );
};

export const User = mongoose.model("User", userSchema);

export const UserClientValidation = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string().min(4),
  isAdmin: z.boolean().nullable(),
});
