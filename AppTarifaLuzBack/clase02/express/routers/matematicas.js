const express = require('express');
const routerMatematicas = express.Router();
const { matematicas } = require('../datos/cursos.js').infoCursos;// con require('../datos/cursos.js') importamos un obj y ese obj tiene una propiedad llamada .infoCursos

// Cursos matemáticas
routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas));
})
routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema === tema);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontró el curso de: ${tema}`);
    }
    res.send(JSON.stringify(resultados));
})

module.exports = routerMatematicas;