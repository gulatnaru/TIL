const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
})

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(404).send('The genre with the given ID was not found');
  res.send(genre);
});

router.patch('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(400).send('Invalid Genre');

  genre.name = req.body.name;
  const result = await genre.save();
  if(!result) return res.status(400).send('Unable to save genre');
  
  res.send(result);
})

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if(!genre) return res.status(404).send('The genre with the given ID was not found');

  res.send(genre);
});

module.exports = router;