//Modulos
const fs = require('node:fs/promises');
const path = require('node:path');

//Parámetro para poder listar otro directorio
const folder = process.argv[2] ?? '.';
//asyncronia secuencial, hasta que no leamos el directorio no continuamos
async function ls (folder){
    let files;
    try{
        files = await fs.readdir(folder);
    }catch{
        console.log(`No se puedo leer el directorio ${folder}`);
        process.exit(1);
    }
    //En paralelo recuperamos la información de todos los archivos del directorio
    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file);
        let stats;
        try {
            stats = await fs.stat(filePath);//stat -> devuelve la información del archivo
        } catch (error) {
            console.log(`No se puedo leer el archivo ${filePath}`);
            process.exit(1);
        }

        const isDirectory = stats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f';
        const fileSize = stats.size;
        const fileModified = stats.mtime.toLocaleString();

        return `${fileType} ${file.padEnd(25)} ${fileSize.toString().padStart(10)} ${fileModified}`;
    })

    const filesInfo = await Promise.all(filesPromises);

    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder);