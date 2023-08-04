const express = require('express'); // Utilizamos require porque estamos usando commonJS
const app = express();
app.disable('x-powered-by');// eliminar la cabecera en la que indicas la tecnología que estás usando

app.get('/', (req, res) => {
    res.json({message: 'hola mundo'});
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`server listen in http://localhost:${PORT}`);
})