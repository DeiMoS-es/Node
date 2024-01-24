//Esto falla, porque el sistema de módulos clásicos(common) 
//no tiene acceso a esta forma de usar async await
//const fs = require('node:fs/promises');
// console.log("Leyendo el primer archivo...");
// const text = await fs.readFile('./archivo.txt', 'utf-8')
// console.log('primer texto: ', text);

// console.log('Hacer cosas mientras lee el archivo...');

// console.log("Leyendo el segundo archivo...");
// const text2 = await fs.readFile('./archivo2.txt', 'utf-8')
// console.log('primer texto: ', text2);
//No funciona en 4.fs-async-await.js

//Para solucionar esto:
//Primero lo cambiamos a módulos: 4.fs-async-await.mjs

//importamos
import { readFile } from "node:fs/promises";

console.log("Leyendo el primer archivo...");
const text = await readFile('./archivo.txt', 'utf-8')
console.log('primer texto: ', text);

console.log('Hacer cosas mientras lee el archivo...');

console.log("Leyendo el segundo archivo...");
const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto: ', text2);