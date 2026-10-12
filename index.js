import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import debug from "debug";
import nunjucks from "nunjucks";
import mongoose from "mongoose";

import { router as home } from "./routes/index.js";
import { router as genres } from "./routes/genres.js";
import { router as customers } from "./routes/customers.js";
import { router as movies } from "./routes/movies.js";
import { env } from "./config.js";

const app = express();

const log = debug("app:startapp");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  log("Logging enabled...");
}

app.use(express.static("public"));
app.use(express.json());

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => log("Connected to MongoDB..."))
  .catch((err) => log("Could not connect to MongoDB", err));

app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

app.listen(env.PORT, () => log(`Listening on port: ${env.PORT}`));
