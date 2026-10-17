import express from "express";

import { logger } from "./lib/logger/index.js";
import { env } from "./config.js";
import { initDb } from "./lib/db/index.js";
import { initMiddleware, errorHandler } from "./middleware/index.js";
import { initTE } from "./lib/templating-engine.js";
import { initRoutes } from "./routes/index.js";

process.on("unhandledRejection", (ex) => {
  throw ex;
});

const app = express();

initTE(app);

initMiddleware(app);

initDb();

initRoutes(app);

app.use(errorHandler);

app.listen(env.PORT, () => logger.info(`Listening on port: ${env.PORT}`));
