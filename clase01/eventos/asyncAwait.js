// Encadenando varias promesas
//Normalmente esta operación sería asyncrona, ya que no sabemos cuanto tiempo va a tardar
function ordenarProducto(producto){
    return new Promise((resolve, reject) => {
        console.log(`Ordenando: ${producto} de la tienda`);
        // Para simular que es un proceso asyncrono
        setTimeout(() => {
            if (producto === 'taza') {
                resolve('Ordenando una taza...');
            } else {
                reject('Este producto no está disponible actualmente.');
            }
        }, 2000);
    });// Esperamos que la promesa se complete al llamar a la función
}

function procesarPedido(respuesta){
    return new Promise(resolve => {
        console.log('Procesando respuesta...');
        console.log(`La respuesta fue: "${respuesta}"`);
        setTimeout(() => {
            resolve('Gracias por tu compra...');
        }, 4000);
    });
}

// ordenarProducto('taza')
//     .then(respuesta => {
//         console.log('Respuesta recibida');
//         console.log(respuesta);
//         return procesarPedido(respuesta);
//     })
//     .then(respuestaProcesada => {
//         console.log(respuestaProcesada);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// Código equivalente al anterior
async function realizarPedido(producto){
    try {
        const respuesta =  await ordenarProducto(producto); //ordenarProducto es asyncrono, con await estamos diciendo que espere al que el proceso asyncrono se complete
        console.log("Respuesta recibida");
        console.log(respuesta);
        const respuestaProcesada = await procesarPedido(respuesta);
        console.log(respuestaProcesada);
    } catch (error) {
        console.log(error);
    }
}

realizarPedido('taza');