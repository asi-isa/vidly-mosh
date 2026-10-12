import express from "express";
import mongoose from "mongoose";
import * as z from "zod";

const router = express.Router();

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
  }),
);

const CustomerSchema = z.object({
  isGold: z.boolean(),
  name: z.string(),
  phone: z.string(),
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).send("Invalid ID");

  const customer = await Customer.findById(id);

  if (!customer) return res.status(404).send("Customer not found");

  return res.send(customer);
});

router.post("/", async (req, res) => {
  const { data, success, error } = CustomerSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error);

  const customer = await Customer.create(data);

  return res.send(customer);
});

export { router };
