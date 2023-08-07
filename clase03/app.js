const express = require('express'); // Utilizamos require porque estamos usando commonJS
const crypto = require('node:crypto');
const app = express();
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');


app.use(express.json()); // Hacemos uso del middelware de express para mandar JSON
app.disable('x-powered-by');// eliminar la cabecera en la que indicas la tecnología que estás usando

// Todos los recursos que sean MOVIES se identifican /movies
app.get('/movies', (req,res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const { genre } = req.query;
    if(genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()));
        return res.json(filteredMovies);
    }
    // res.status(404).json({message: 'Movie not found.'});
    // res.send(JSON.stringify(movies));
    res.json(movies);
});
app.get('/movies/:id', (req, res) => { // path-to-regexp
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if(movie) return res.json(movie);
    res.status(404).json({message: 'Movie not found.'});
});
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    
    const newMovie = {
        id: crypto.randomUUID(), // uuid v4
        ...result.data // si hemos hecho bien la validación, vamos a tener ya los datos, no va a dejar pasar los datos mal validados 
    }
    // Esto no sería REST porque estamos guardando
    // el estado de la aplicación en memoria
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body);
    if(!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id); //findIndex buscamos el indice

    if( movieIndex === -1 ) return res.status(404).json({ message: 'Movie not found' });

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie;
    return res.json(updateMovie);
})


const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`server listen in http://localhost:${PORT}`);
})