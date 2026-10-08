import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import debug from "debug";
import * as z from "zod";

import { env } from "./config.js";

const log = debug("app:startapp");

const app = express();

app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  log("Logging enabled...");
}

app.use(express.static("public"));
app.use(express.json());

const genres = [
  { id: 1, title: "Horror" },
  { id: 2, title: "Comedy" },
];

const GenreSchema = z.object({
  title: z.string().min(3),
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Genre not found.");
  }

  return res.send(genre);
});

app.post("/api/genres", (req, res) => {
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

app.put("/api/genres/:id", (req, res) => {
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

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.status(204);
});

app.listen(env.PORT, () => debug(`Listening on port: ${env.PORT}`));
