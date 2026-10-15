import { Router } from "express";

import { auth } from "../middleware/auth.js";
import { Rental, RentalClientSchema } from "../models/rental.js";
import { Movie } from "../models/movie.js";
import { Customer } from "../models/customer.js";

const router = Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  return res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { success, data, error } = RentalClientSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error.message);

  const customer = await Customer.findById(data.customerId);
  if (!customer) return res.status(404).send("No customer found");
  const movie = await Movie.findById(data.movieId);
  if (!movie) return res.status(404).send("No movie found");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  const rental = await Rental.create({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  movie.numberInStock--;
  await movie.save();

  return res.send(rental);
});

export { router };
