import mongoose from "mongoose";
import * as z from "zod";

export const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true },
  }),
);

export const GenreSchema = z.object({
  name: z.string().min(3),
});
