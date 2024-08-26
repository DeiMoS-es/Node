 // Primer paso, configurar express
const express = require('express'); // Traemos la libreria
const http = require('http');
const socketIo = require('socket.io');
const chatRoutes = require('./routes/api/chat');
const cors = require('cors');
require('dotenv').config(); // Cargamos las variables del ficher .env en process.env

const app = express(); 

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Pensar en las rutas que vamos a usar para la llamada
// Delegamos la peticiones que vayan por la ruta /api al fichero api.js
app.use('/api', require('./routes/api'));

// Ponemos la aplicación a escuchar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});