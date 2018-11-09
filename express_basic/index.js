const express = require('express');
const app = express();

const movies = [
    { id: 1, title: 'Bohemian Rhapsody'},
    { id: 2, title: 'Matrix'},
    { id: 3, title: 'Edge of Tommorow'}
]

app.get('/', (req, res) => {
    res.send('Happy Hacking');
});

app.get('/:name', (req, res) => {
    res.send(`Hi, ${teq.params.name}`);
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
// app.post();

/* PUT /api/movies/1 */
// app.put();

/* DELETE /api/movies/1 */
// app.delete();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`));