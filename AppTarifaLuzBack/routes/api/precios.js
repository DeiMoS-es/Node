// Encargado de gestionar las peticiones para obtener los precios de las distintas CCAA
const router = require('express').Router();
const precioModel = require('../../models/electricidad.precios');
const axios = require('axios');
const moment = require('moment');

router.get('/', async (req, res) => {// Petición sobre la ruta /api/precios
    try{
        const currentDate = moment().format('YYYY-MM-DD');
        // const currentDate = new Date();
        console.log("Fecha: " + currentDate);
        const nextDayDate = moment().add(1, 'day').format('YYYY-MM-DD');
        console.log(nextDayDate);
        const apiUri = process.env.APIREDTADAURI.replace(/start_date=[^&]*/, `start_date=${currentDate}`).replace(/end_date=[^&]*/, `end_date=${nextDayDate}`);
        const response = await axios.get(apiUri);
        const data = response.data;
        const precioData = new precioModel(data);
        console.log('Datos de la respuesta:', data);
        console.log('Objeto precioData:', precioData);
        res.json(data);
    }catch(err){

    }
});


/*
Ejemplo para cuando añada la opción de seleccionar la zona, zona será un parámetro que nos viene por url
router.get('/:zone', (req, res) => {});
*/

module.exports = router;