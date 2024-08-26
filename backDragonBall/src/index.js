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
app.get("/", (req, res) => {
  const htmlResponse = `
  <html> 
    <head>
      <title>API REST</title>
    </head>
    <body>
      <h1>API REST</h1>
      <p>Esta es la API REST de la aplicación de chat</p>
    </body> 
  </html>
    `;
    res.send(htmlResponse);
}
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});