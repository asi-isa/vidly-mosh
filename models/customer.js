import mongoose from "mongoose";
import * as z from "zod";

export const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
  }),
);

export const CustomerSchema = z.object({
  isGold: z.boolean(),
  name: z.string(),
  phone: z.string(),
});
