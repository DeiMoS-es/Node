// console.log("Hola, mundo");
// console.log(globalThis);

//CommonJS require module
//Creamos una constante, donde guardaremos la función que hemos declarado que se va a exportar, en este caso la función suma
const {suma} = require('./sum')
//Como el archivo sum.js solo tiene una función que hace la suma de dos valores, al hacer el console.log, obtenemos el valor de la ruma
console.log(suma(1, 2));