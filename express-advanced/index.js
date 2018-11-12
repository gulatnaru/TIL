const home = require('./routes/home');
const movies = require('./routes/movies');
const debug = require('debug')('app:startup');
const helmet = require('helmet');
const config = require('config');
const morgan = require('morgan');
const auth = require('./middlewares/auth');
const logger = require('./middlewares/logger');
const Joi = require('joi');
const express = require('express');
const app = express();

console.log(`Node_env: ${app.get('env')}`)
console.log(app.get('env'));
// console.log(app.get('debug'));

app.use(helmet());
if(app.get('env') === 'development'){
    debug('MORGAN을 실행합니다.');
    app.use(morgan('dev'));
}

app.use(express.json());
// /api/users?key1=value1&key2=value2
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use('/api/movies', movies);
app.use(home);

//app.use( auth );

app.set('view engine', 'pug');
app.set('views', './views'); //Default

app.use(function(req, res, next){
    console.log('모든 요청이 올 때마다 로그를 남깁니다.')
    next();
});

app.use(function(req, res, next){
    console.log('사용자 인증을 진행중입니다.')
    next();
});

// const movies = [
//   { id: 1, title: 'Bohemian Rhapsody' },
//   { id: 2, title: 'Matrix' },
//   { id: 3, title: 'Edge of Tommorow' },
// ];

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Happy Hacking',
//         greeting: 'May you have happy hacking'
//     })
// })

// app.get('/', (req, res) => {
//   res.send('Happy Hacking');
// });

app.get('/:name', (req, res) => {
  res.send(`Hi, ${req.params.name}`);
});


/* GET /api/movies */
app.get('/api/movies', (req, res) => {
  res.send(movies);
});

/* GET /api/movies/1 */
app.get('/api/movies/:id', (req, res) => {
  const movie = getMovie(movies, parseInt(req.params.id));
  if (!movie) res.status(404).send(`Movie with given id(${req.params.id}) is not found.`);
  res.send(movie);
});

/* POST /api/movies */
app.post('/api/movies', (req, res) => {
  const { error } = validateMovie(req.body)

  if (error) return res.status(400).send(error.message);
  
  const movie = {
    id: movies.length + 1,
    title: req.body.title
  };

  movies.push(movie);
  res.send(movie);
});

/* PUT /api/movies/1 */
app.put('/api/movies/:id', (req, res) => {
  const movie = getMovie(movies, parseInt(req.params.id));
  if (!movie) return res.status(404).send(`The movie with the given ID(${req.params.id}) was not found`);
  
  const { error } = validateMovie(req.body)
  // const error = validateMovie(req.body).error;

  if (error) return res.status(400).send(error.message);

  movie.title = req.body.title;
  res.send(movie);
});

/* DELETE /api/movies/1 */
app.delete('/api/movies/:id', (req, res) => {
  const movie = getMovie(movies, parseInt(req.params.id));
  if (!movie) return res.status(404).send(`The movie with the given ID(${req.params.id}) was not found`);

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(2).required(),
  }
  return Joi.validate(movie, schema);
}

function getMovie(movies, id){
  return movies.find(movie => movie.id === id)
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));