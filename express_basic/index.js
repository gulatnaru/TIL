const Joi = require('joi');
const express = require('express');
const app = express();

const movies = [
    { id: 1, title: 'Bohemian Rhapsody'},
    { id: 2, title: 'Matrix'},
    { id: 3, title: 'Edge of Tommorow'}
]

const schema = {
    title: Joi.string().min(2).required(),
}

app.get('/', (req, res) => {
    res.send('Happy Hacking');
});

app.get('/:name', (req, res) => {
    res.send(`Hi, ${req.params.name}`);
});

// CRUD
// CREATE READ UPDATE DESTROY
// POST   GET  PUT    DELETE

/* GET /api/movies/1 */
app.get('/api/movies', (req, res) => {
    res.send(movies);
});

/* GET /api/movies/1 */
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find((movie) => {
        return movie.id === parseInt(req.params.id);
    });
    if(!movie){
        res.status(404).send(`Movie with given id(${req.params.id}) is not found`);
    }
    res.send(movie);
});

/* POST /api/movies/1 */
app.post('/api/movies', (req, res) => {

    const result = Joi.validate(req.body, schema);
    console.log('==============');
    console.log(result);
    console.log('==============');

    if(result.error){
        return res.status(400).send(result.error.message);
    }

    const movie = {
        id: movies.length + 1,
        title: req.body.title
    };
    movies.push(movie);
    res.send(movies);
});

/* PUT /api/movies/1 */
app.put('/api/movies/:id', (res, req) => {
    console.log(req.params.id);
    // movies에서 id로 movie를 찾는다.
    const movie = movies.find( movie =>  movie.id === parseInt(req.params.id));
    
    //없으면 404
    if(!movie){
        res.status(404).send(`The movie with the given ID(${req.params.id}) was not found`);
    }
    console.log(movie);
    //아니면 입력 데이터를 검사한다.
    const result = Joi.validate(req.body, schema);

    // Good! Update한다.
    movie.title = req.body.title;
    res.send(movie);
});

/* DELETE /api/movies/1 */
app.delete('/api/movies/:id', (req, res) => {
    // movies에서 id로 movie를 찾는다.
    const movie = movies.find( movie =>  movie.id === parseInt(req.params.id));
    
    //없으면 404
    if(!movie){
        res.status(404).send(`The movie with the given ID(${req.params.id}) was not found`);
    }
    console.log(movie);
    //아니면 입력 데이터를 검사한다.
    const result = Joi.validate(req.body, schema);

    //delete 로직 수행
    movies.splice(movies.indexOf(movie), 1);

    //삭제된 데이터 send
    res.send(movies);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`));