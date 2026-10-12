import mongoose from "mongoose";
import * as z from "zod";

export const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const Genre = mongoose.model("Genre", genreSchema);

export const GenreValidationSchema = z.object({
  name: z.string().min(3),
});
