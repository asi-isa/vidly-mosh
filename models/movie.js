import mongoose from "mongoose";
import * as z from "zod";
import { genreSchema } from "./genre.js";

export const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
  genre: {
    type: genreSchema,
    required: true,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);

export const MovieValidationSchema = z.object({
  title: z.string().min(5).max(255),
  numberInStock: z.number().min(0).max(255),
  dailyRentalRate: z.number().min(0).max(255),
  genreId: z.string(),
});
