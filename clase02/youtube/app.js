const http = require('http');
const servidor = http.createServer((req, res) => {
    res.end('Hola, gilipollas');
})

const PUERTO = 3001;

servidor.listen(PUERTO, () => {
    console.log(`Servidor escuchando en: http://localhost:${PUERTO}` );
})