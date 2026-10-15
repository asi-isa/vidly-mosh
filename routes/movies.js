import express from "express";
import mongoose from "mongoose";

import { auth } from "../middleware/auth.js";
import { Movie, MovieValidationSchema } from "../models/movie.js";
import { Genre } from "../models/genre.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");

  return res.send(movies);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).send("Invalid ID");

  const movie = await Movie.findById(id);

  if (!movie) return res.status(404).send("No Movie found");

  return res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { success, data, error } = MovieValidationSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error.message);

  const genre = await Genre.findById(data.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = new Movie({
    title: data.title,
    numberInStock: data.numberInStock,
    dailyRentalRate: data.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
  });
  await movie.save();

  return res.status(201).send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).send("Invalid ID");

  const movie = await Movie.findOneAndDelete(id);

  if (!movie) return res.status(404).send("No Movie found");

  return res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).send("Invalid ID");

  const { success, data, error } = MovieValidationSchema.partial().safeParse(
    req.body,
  );
  if (!success) return res.status(400).send(error.message);
  if (Object.keys(data).length === 0) {
    return res.status(400).send("At least one field is required");
  }

  const update = { ...data };
  if (data.genreId !== undefined) {
    const genre = await Genre.findById(data.genreId);
    if (!genre) return res.status(400).send("Invalid Genre");
    update.genre = { _id: genre._id, name: genre.name };
    delete update.genreId;
  }

  const movie = await Movie.findByIdAndUpdate(id, update, { new: true });
  if (!movie) return res.status(404).send("No Movie found");
  return res.send(movie);
});

export { router };
