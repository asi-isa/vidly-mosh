import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import debug from "debug";
import nunjucks from "nunjucks";

import { mountRoutes } from "./routes/index.js";
import { env } from "./config.js";
import { error } from "./middleware/error.js";
import { dbInit } from "./db/index.js";

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

dbInit();

mountRoutes(app);

app.use(error);

app.listen(env.PORT, () => log(`Listening on port: ${env.PORT}`));
