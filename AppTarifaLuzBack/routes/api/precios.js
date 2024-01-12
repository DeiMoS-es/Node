// Encargado de gestionar las peticiones para obtener los precios de las distintas CCAA
const router = require('express').Router();

router.get('/', (req, res) => {// Petición sobre la ruta /api/precios

});


/*
Ejemplo para cuando añada la opción de seleccionar la zona, zona será un parámetro que nos viene por url
router.get('/:zone', (req, res) => {});
*/

module.exports = router;