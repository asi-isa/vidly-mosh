import express from "express";
import mongoose from "mongoose";

import { Customer, CustomerSchema } from "../models/customer.js";

const router = express.Router();

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
