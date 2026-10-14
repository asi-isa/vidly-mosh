import { Router } from "express";
import bcrypt from "bcrypt";
import * as z from "zod";
import { User } from "../models/user.js";

const router = Router();

const AuthUserValidation = z.object({
  email: z.email(),
  password: z.string().min(4),
});

router.post("/", async (req, res) => {
  const { success, error, data } = AuthUserValidation.safeParse(req.body);
  if (!success) return res.status(400).send(error.message);

  const user = await User.findOne({ email: data.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  return res.send(token);
});

export { router };
