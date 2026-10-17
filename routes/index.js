import { router as home } from "./home.js";
import { router as genres } from "./genres.js";
import { router as customers } from "./customers.js";
import { router as movies } from "./movies.js";
import { router as rentals } from "./rentals.js";
import { router as users } from "./users.js";
import { router as auth } from "./auth.js";

export const initRoutes = (app) => {
  app.use("/", home);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
