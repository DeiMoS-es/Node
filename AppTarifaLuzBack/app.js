// Primer paso, configurar express
const express = require('express'); // Traemos la libreria

require('dotenv').config(); // Cargamos las variables del ficher .env en process.env

const app = express(); 

// Ponemos la aplicación a escuchar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});