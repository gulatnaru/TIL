const home = require('./routes/home');
const movies = require('./routes/movies');
const debug = require('debug')('app:startup');
// const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const logger = require('./middlewares/logger');
// const Joi = require('joi');
const express = require('express');
const app = express();

console.log(app.get('env'));
console.log(app.get('debug'));

app.use(helmet());
if (app.get('env') === 'development') {
  debug('MORGAN 을 실행합니다.')
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use(home);
app.use('/api/movies', movies);

app.set('view engine', 'pug');
app.set('views', './views'); // Default

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));