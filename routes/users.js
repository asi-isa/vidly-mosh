import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";

import { User, UserClientValidation } from "../models/user.js";

const router = Router();

router.post("/", async (req, res) => {
  const { success, data, error } = UserClientValidation.safeParse(req.body);
  if (!success) return res.status(400).send(error.message);

  let user = await User.findOne({ email: data.email });
  if (user) return res.status(400).send("User already registered");

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(data.password, salt);

  user = await User.create({
    email: data.email,
    name: data.name,
    password: hashed,
  });

  const jwtPayload = { _id: user._id };
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

  return res.status(201).header("x-auth-token", token).send({
    id: user._id,
    email: user.email,
    name: user.name,
  });
});

export { router };
