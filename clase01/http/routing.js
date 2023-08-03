// En este js se hará uso de cursos.js
const http = require('http');
const cursos = require('./cursos');

const servidor = http.createServer((req, res) => {
    const {method} = req; // Sintaxis de desustructuración, extraemos la propiedad METHOD
    switch(method){
        case 'GET':
            return manejarSolicitudGET(req, res);
        case 'POST':
            return manejarSolicitudPOST(req, res);
        default:
            res.statusCode = 501;
            res.end(`El método no puede ser manejado por el servidor: ${method}`);
            break;
    }
})

const PUERTO = 1234;

servidor.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto http://localhost:${PUERTO}`);
});

function manejarSolicitudPOST(req, res){
    const path = req.url;
    if(path === '/cursos/programacion'){
        return res.end('El servidor recibio la solicitud POST para /cursos/programacion')
    }
    res.statusCode = 404;
    res.end('El recurso solicitado no existe.');
}

function manejarSolicitudGET(req, res){
    const path = req.url;
    if(path === '/') {
        // res.statusCode = 200; // Por defecto si tiene éxito es 200
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end('Bienvenidos a mi primer servidor y API');
    } else if (path === '/cursos') {
        // res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos));
    } else if (path === '/cursos/programacion') {
        // res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos.programacion));
    }
    res.statusCode = 404;
    res.end('El recurso solicitado no existe.');
}