const genres = require('./routes/genres');
const movies = require('./routes/movies');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

/* Connect DB */
mongoose.connect('mongodb://localhost/video-api', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

/* Middlewares */
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/movies', movies);

/* Models */
/* Routes */

/* Server */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));