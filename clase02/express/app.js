const express = require('express');
const app = express(); // Retorna una aplicación de express

const { infoCursos } = require('./cursos.js');

// console.log(infoCursos);

// Routing
app.get('/', (req,res) => {
    res.send('Mi primer servidor. Cursos 💻.')
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`El servidor está esuchando en http://localhost:${PUERTO}...`);
});