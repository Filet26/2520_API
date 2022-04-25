const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const fs = require("fs");

// log date and ip of request
function logToFile(req, res, next) {
  fs.appendFileSync(
    "APIlog.txt",
    `\n${req.method} request at ${new Date()} from ${req.ip}`
  );
  next();
}

router.use(logToFile);

router.get("/", async (req, res) => {
  const movie = await Movie.find();
  res.json(movie);
});

// POST
router.post("/new", async (req, res) => {
  const MovieEntry = new Movie(req.body);
  const saveentry = await MovieEntry.save();
  res.json(MovieEntry);
});

// GET, by ID
router.get("/get/:id", async (req, res) => {
  const movie = await Movie.findById({ _id: req.params.id });
  res.json(movie);
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  const deleted_movie = await Movie.findByIdAndDelete({ _id: req.params.id });
  res.json(deleted_movie);
});

// PATCH
router.patch("/update/:id", async (req, res) => {
  const movie = await Movie.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(movie);
});

// PUT
router.put("/replace/:id", async (req, res) => {
  const movie = await Movie.findOneAndReplace(
    { _id: req.params.id },
    { Name: req.body.Name, Release_date: req.body.Release_date }
  );
  const updated_movie = await Movie.findById({ _id: req.params.id });

  res.json(updated_movie);
});
module.exports = router;
