const miURL = new URL('https://wwww.ejempplo.org/cursos/programacion?ordenar=vistas&nivel=1');

console.log(miURL.hostname); // www.ejemplo.org
console.log(miURL.pathname); // /cursos/programacion
console.log(miURL.searchParams); //devuelve un obj
console.log(miURL.searchParams.get('ordenar'));