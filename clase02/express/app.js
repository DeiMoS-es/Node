const express = require('express');
const app = express(); // Retorna una aplicación de express

const { infoCursos } = require('./cursos.js');

// console.log(infoCursos);

// Routing
app.get('/', (req,res) => {
    res.send('Mi primer servidor. Cursos 💻.')
});
app.get('/api/cursos', (req,res) => {
    res.send(JSON.stringify(infoCursos));
});

// Cursos Programacion
app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
})
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron curso de: ${lenguaje}.`);
    }
    res.send(JSON.stringify(resultados));
})

// Cursos matemáticas
app.get('/api/cursos/matematicas', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
})
app.get('/api/cursos/matematicas/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontró el curso de: ${tema}`);
    }
    res.send(JSON.stringify(resultados));
})
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`El servidor está esuchando en http://localhost:${PUERTO}...`);
});