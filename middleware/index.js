import express from "express";
import debug from "debug";
import helmet from "helmet";
import morgan from "morgan";

import { auth } from "./auth.js";
import { admin } from "./admin.js";
import { error } from "./error.js";

const log = debug("app:initMiddleware");

export { auth, admin, error as errorHandler };

export function initMiddleware(app) {
  app.use(helmet());

  if (app.get("env") === "development") {
    app.use(morgan("dev"));
    log("Logging enabled...");
  }

  app.use(express.static("public"));
  app.use(express.json());
}
