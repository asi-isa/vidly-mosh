import express from "express";
import debug from "debug";

import { env } from "./config.js";
import { initDb } from "./lib/db/index.js";
import { initMiddleware, errorHandler } from "./middleware/index.js";
import { initTE } from "./lib/templating-engine.js";
import { initRoutes } from "./routes/index.js";

const app = express();

const log = debug("app:startapp");

initTE(app);

initMiddleware(app);

initDb();

initRoutes(app);

app.use(errorHandler);

app.listen(env.PORT, () => log(`Listening on port: ${env.PORT}`));
