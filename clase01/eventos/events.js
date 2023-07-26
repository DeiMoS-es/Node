const EventEmitter = require('events') //veste módulo retorna una clase de nombre EventEmitter
const emisorProductos = new EventEmitter();//vcreamos una nueva instancia de la clase EventEmitter
// console.log(EventEmitter);

//.on('compra')->cuando ocurra un evento compra
emisorProductos.on('compra', (total, numProductos) => {
    console.log(`Número de productos: ${numProductos}`);
    console.log(`Total de la compra: ${total}€.`);
});
// cuando se ejecute la siguiente línea, va a buscar el evento asociado
emisorProductos.emit('compra', 500, 5);