// Primer paso, configurar express
const express = require('express'); // Traemos la libreria
const cors = require('cors');
require('dotenv').config(); // Cargamos las variables del ficher .env en process.env

const app = express(); 

// Config, especificamos que nuestra app va a tratar las peticiones como si fuesen objetos
// y podremos recuperarlas dentro del req.body()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Pensar en las rutas que vamos a usar para la llamada,para este caso y de momento será para obtener los datos de peninsula
// TODO hacer rutas para canarias, ceuta y melilla
// Peninsula -> GET /api/precios/peninsula
// Delegamos la peticiones que vayan por la ruta /api al fichero api.js
app.use('/api', require('./routes/api'));

// Ponemos la aplicación a escuchar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});