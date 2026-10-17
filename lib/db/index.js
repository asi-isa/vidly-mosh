import mongoose from "mongoose";

import { logger } from "../logger/index.js";

export function initDb() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => logger.info("Connected to MongoDB..."));
}
