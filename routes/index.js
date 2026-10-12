import { router as home } from "./home.js";
import { router as genres } from "./genres.js";
import { router as customers } from "./customers.js";
import { router as movies } from "./movies.js";

export const mountRoutes = (app) => {
  app.use("/", home);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
};
