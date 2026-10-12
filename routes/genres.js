import express from "express";

import { Genre, GenreSchema } from "../models/genre.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  return res.send(genres);
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found.");
    return res.send(genre);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  const { success, error, data } = GenreSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error.message);

  const genre = await Genre.create({ name: data.name });

  return res.status(201).send(genre);
});

router.put("/:id", async (req, res) => {
  const { success, error, data } = GenreSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: data.name },
    { new: true },
  );

  if (!genre) return res.status(404).send("Genre not found");

  return res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("Genre not found");

  return res.status(204);
});

export { router };
