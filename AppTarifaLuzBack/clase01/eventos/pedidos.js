// Función para simular el éxito o francaso en las peticiones
const estatusPedido = () => {
    return Math.random() < 0.8;
}

const miPedidoDePizza = new Promise((resolve, reject) => {
    setTimeout(()=>{
        if(estatusPedido()){
            resolve('Pedido exitoso! Su piza está en camino.');
        } else {
            reject('Ocurrió un error. Por favor intente nuevamente.');
        }
    }, 2000);
})

// const manejarPedido = (mensajeDeConfirmacion) => {
//     console.log(mensajeDeConfirmacion);
// }

// const rechazarPedido = (mensajeDeError) => {
//     console.log(mensajeDeError);
// }

// miPedidoDePizza.then(manejarPedido, rechazarPedido);

miPedidoDePizza
    .then((mensajeDeConfirmacion) => {
        console.log(mensajeDeConfirmacion);
    })
    .catch((mensajeDeError) => {
        console.log(mensajeDeError);
    })