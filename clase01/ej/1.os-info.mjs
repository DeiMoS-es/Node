//Módulos nativos de node
// const os = require('os');//no recomendable
import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os';
console.log('Informacón del sistema operativo: ');
console.log("-----------------------------------");
console.log('Nombre del sistema operativo', platform());
console.log('Versión del sistema operativo', release());
console.log('Arquitectura', arch());
console.log('CPUs', cpus());// <---- Vamos a poder escalar procesos en Node
console.log('Memoria libre', freemem() / 1024 / 1024);
console.log('Memoria total', totalmem() / 1024 / 1024);
console.log('uptime', uptime() / 60 / 60);