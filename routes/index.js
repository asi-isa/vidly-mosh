import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.html", { heading: "Hello Node!" });
});

export default router;
