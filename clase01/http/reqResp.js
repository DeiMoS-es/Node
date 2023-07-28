const http = require("http");

const servidor = http.createServer((req, res) => {
    // console.log("===> req(solicitud)");
    // // console.log(req);
    // res.end("Hola Mundo");
    // console.log(req.url);
    // console.log(req.method);
    // console.log(req.headers);
    console.log("===> res (respuesta)");
    // console.log(res.statusCode);
    // Cambiar el código de estado
    // res.statusCode = 404;
    // console.log(res.statusCode);
    // Configurar la cabecera
    res.setHeader('content-type', 'application/json');
    console.log(res.getHeaders());
});
const PUERTO = 3000;
servidor.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}`);
})