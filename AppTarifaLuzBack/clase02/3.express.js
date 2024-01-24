// Primero importamos express
const express = require('express');
const ditto = require('./pokemon/ditto.json');
const app = express();

app.disable('x-powered-by'); // Desactivar la cabecera que indica el tipo de tecnología que se usa

const PORT = process.env.PORT ?? 1234;

app.use(express.json()); // Hace lo mismo que lo comentado abajo

// app.use((req, res, next) => {
//     console.log('mi primer middelware');
//     // revisar si el usuario tiene coockies por ejemplo
//     // si no ponemos el next(), se queda aquí ya que no estoy enviando respuesta, y no sabe por donde continuar
//     if(req.method !== 'POST') return next();
//     if(req.headers['content-type'] !== 'application/json') return next();
//     // Solo llegan request que son POST y que tienen el header Content-Type: application/json
//     let body = ''
//     // escuchar evento data
//     req.on('data', chunk => {
//         body += chunk.toString()
//     })
//     req.on('end', () => {
//         const data = JSON.parse(body)        
//         data.timestamp = Date.now();
//         // mutar la rquest y meter la info en req.body
//         req.body = data;
//         next();
//     })
// })

// A diferencia de NodeJS, aquí deciamos cuando reciba un GET ejecuta la función
// No se ha puesto el content-type y la analiza y pone automáticamente
app.get('/pokemon/ditto', (req, res) => {
    // res.status(200).send('<h1>Mi página</h1>'); // por defecto el status es 200
    // res.send('<h1>Mi página</h1>'); //Ya detecta que es un html y pone el Content-type que corresponde
    // res.json({message: 'Hola mundo'}); // Lo mismo que en el caso anterior
    res.json(ditto);
})

app.post('/pokemon', (req, res) => {
    //lo estamos tratando en un middelware
    res.status(201).json(req.body);
})

// Para tratar el resto de peticiones que no existan, usamos el .use
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
})
