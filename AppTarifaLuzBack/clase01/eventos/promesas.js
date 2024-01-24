// para fines de demostración
const promesaCumplida = false;

const miPromesa = new Promise((resolve, reject) => {
    setTimeout( () => {
        if (promesaCumplida){
            resolve('¡Promesa cumplida!');
        } else {
            reject('Promesa rechazada...');
        }
    } , 3000);
});

const manejarPromesaCumplida = (valor) => {
    console.log(valor);
};
const manejarPromesaRechazada = (razonRechazo) => {
    console.log(razonRechazo);
};

// miPromesa.then((valor) => {// En este caso solo estbámos manejando en el caso de que fuese exitosa
//     console.log(valor);
// })

miPromesa.then(manejarPromesaCumplida, manejarPromesaRechazada);
