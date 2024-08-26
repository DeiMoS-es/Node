// encargado de gestionar todas las rutas de la api
const router = require('express').Router();

router.use('/chat', require('./api/chat')); // redirección para las peticiones del chat

module.exports = router;