import mongoose from "mongoose";
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
});

export const User = mongoose.model("User", userSchema);

export const UserClientValidation = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string().min(4),
});
