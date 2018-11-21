const Joi = require('joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: true },
    required: true,
    minlength: 3,
    maxlength: 50,
  }
});
genreSchema.plugin(uniqueValidator);

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).max(50).required()
  }
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
