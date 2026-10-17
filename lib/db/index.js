import mongoose from "mongoose";
import debug from "debug";

const log = debug("app:db");

export function initDb() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => log("Connected to MongoDB..."))
    .catch((err) => log("Could not connect to MongoDB", err));
}
