import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import debug from "debug";
import nunjucks from "nunjucks";

import home from "./routes/index.js";
import genres from "./routes/genres.js";

import { env } from "./config.js";

const log = debug("app:startapp");

const app = express();

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

app.use("/", home);
app.use("/api/genres", genres);

app.listen(env.PORT, () => debug(`Listening on port: ${env.PORT}`));
