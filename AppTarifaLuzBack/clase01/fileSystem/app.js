const fs = require('fs');

// Leer un archivo
// fs.readFile('./index.html', 'utf-8', (err, contenido) => {
//     if (err) {
//         throw err; // con throw detenemos la ejecución del programa
//         // console.log(err); 
//     } else {
//         console.log(contenido);
//     }
//     console.log("Mensaje...");
// })

// Cambiar nombre archivo
// fs.rename('index.html', 'main.html', (err) =>{
//     if(err){
//         throw err;
//     } else {
//         console.log('Nombre cambiado con éxito.');
//     }
// })

// Agregar contenido al final de un archivo.
// fs.appendFile('index.html', '<p>Buenas Tardes</p>', (err) => {
//     if (err){
//         throw err;
//     } else {
//         console.log("Archivo actualizado");
//     }
// })

// Reemplazar todo el contenido del archivo
// fs.writeFile('index.html', 'Contenido nuevo', (err) => {
//     if (err){
//         throw err;
//     } else {
//         console.log("Contenido añadido/reemplazado exitosamente");
//     }
// })

// Eliminar archivos
fs.unlink('archivoEliminar.html', (err) => {
    if (err){
        throw err;
    } else {
        console.log("Archivo eliminado");
    }
});