const express = require("express");
const router = express.Router();
const Joi = require('joi');

const movies = [
  { id: 1, title: "Bohemian Rhapsody" },
  { id: 2, title: "Matrix" },
  { id: 3, title: "Edge of Tommorow" }
];

router.get("/:name", (req, res) => {
  res.send(`Hi, ${req.params.name}`);
});

/* GET /api/movies */
router.get("/", (req, res) => {
  res.send(movies);
});

/* GET /api/movies/1 */
router.get("/:id", (req, res) => {
  const movie = getMovie(movies, parseInt(req.params.id));
  if (!movie)
    res.status(404).send(`Movie with given id(${req.params.id}) is not found.`);
  res.send(movie);
});

/* POST /api/movies */
router.post("/", (req, res) => {
  const { error } = validateMovie(req.body);

  if (error) return res.status(400).send(error.message);

  const movie = {
    id: movies.length + 1,
    title: req.body.title
  };

  movies.push(movie);
  res.send(movie);
});

/* PUT /api/movies/1 */
router.put("/:id", (req, res) => {
  const movie = getMovie(movies, parseInt(req.params.id));
  if (!movie)
    return res
      .status(404)
      .send(`The movie with the given ID(${req.params.id}) was not found`);

  const { error } = validateMovie(req.body);
  // const error = validateMovie(req.body).error;

  if (error) return res.status(400).send(error.message);

  movie.title = req.body.title;
  res.send(movie);
});

/* DELETE /api/movies/1 */
router.delete("/:id", (req, res) => {
  const movie = getMovie(movies, parseInt(req.params.id));
  if (!movie)
    return res
      .status(404)
      .send(`The movie with the given ID(${req.params.id}) was not found`);

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(2)
      .required()
  };
  return Joi.validate(movie, schema);
}

function getMovie(movies, id) {
  return movies.find(movie => movie.id === id);
}

module.exports = router;
