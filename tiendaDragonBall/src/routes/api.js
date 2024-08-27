// encargado de gestionar todas las rutas de la api
const router = require('express').Router();
router.use('/heroes',require('./api/productsRoute'));
module.exports = router;