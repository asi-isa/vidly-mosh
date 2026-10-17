import mongoose from "mongoose";

export function dbInit() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => log("Connected to MongoDB..."))
    .catch((err) => log("Could not connect to MongoDB", err));
}
