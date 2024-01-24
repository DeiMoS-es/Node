const http = require('http');
const servidor = http.createServer((req, res) => {
    res.end('Hola, acx');
})

const PUERTO = 3001;

servidor.listen(PUERTO, () => {
    console.log(PUERTO);
    console.log(`Servidor escuchando en: http://localhost:${PUERTO}` );
})