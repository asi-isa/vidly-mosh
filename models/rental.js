import mongoose from "mongoose";
import * as z from "zod";

import { movieSchema } from "./movie.js";

export const rentalSchema = new mongoose.Schema({
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
  customer: {
    type: new mongoose.Schema({
      isGold: { type: Boolean, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
      },
      dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
    }),
    required: true,
  },
});

export const Rental = mongoose.model("Rental", rentalSchema);

export const RentalClientSchema = z.object({
  customerId: z.string(),
  movieId: z.string(),
});
