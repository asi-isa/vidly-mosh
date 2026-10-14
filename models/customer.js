import mongoose from "mongoose";
import * as z from "zod";

export const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

export const Customer = mongoose.model("Customer", customerSchema);

export const CustomerClientSchema = z.object({
  isGold: z.boolean(),
  name: z.string(),
  phone: z.string(),
});
