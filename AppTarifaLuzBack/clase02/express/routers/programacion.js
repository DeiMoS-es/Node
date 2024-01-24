const express = require('express');
const routerProgramacion = express.Router();
const { programacion } = require('../datos/cursos.js').infoCursos;

// Middelware
routerProgramacion.use(express.json()); // nos permite procesar el cuerpo de la solicitud en formato JSON
// Cursos Programacion
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion));
});
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron curso de: ${lenguaje}.`);
    }
    if(req.query.ordenar === 'vistas'){
       return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));
    } 

    res.send(JSON.stringify(resultados));
});
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de: ${lenguaje} de nivel ${nivel}.`);
    }
    res.send(JSON.stringify(resultados));
});
routerProgramacion.post('/', (req, res) => {
    // Para extraer el cuerpo de la solicitud para poder incluir un curso nuevo
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});
routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0){
        programacion[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(programacion));

});

module.exports = routerProgramacion;