import express from "express";
import * as z from "zod";

const router = express.Router();

const genres = [
  { id: 1, title: "Horror" },
  { id: 2, title: "Comedy" },
];

const GenreSchema = z.object({
  title: z.string().min(3),
});

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Genre not found.");
  }

  return res.send(genre);
});

router.post("/", (req, res) => {
  const { success, error, data } = GenreSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).send(error.message);
  }

  const genre = {
    id: genres.length + 1,
    title: data.title,
  };

  genres.push(genre);

  return res.status(201).send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  const { success, error, data } = GenreSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).send(error);
  }

  genre.title = data.title;

  return res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.status(204);
});

export default router;
