Node es un entorno de desarrollo o de ejecución para JS, no un lenguaje de programación
Su arquitectura, está orientada a 
Utiliza el motor V8, pero no mismo entorno, que también utiliza Chrome

Pasos para instalar/usar node:
    -Consejos:
        * Utilizar un gestor de paquetes/versiones de Node, por ejemplo Fnm: (https://github.com/Schniz/fnm)
        * Fnm está construido con Rust, con lo cual será necesario tener instalado Rust.
        ** Instalar Rust: (curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh)
        *Una vez instalado, fnm --version
        ** fnm list (ver versiones de Node isntaladas)
        ** fnm install 18.17.0 (instalar versión específica de node)
        ** fnm use 18.17.0 (usar la versión de node)
        * node --version (comprobar la versión usada de Node)
        ** fnm alias 18.17.0 default (usar versión de Node por defecto)
    Para ejecutar Node: comando node
    Node, es un entorno de desarrollo distinto al del navegador y el objeto WINDOW no existe.
    globalThis, variable global de NOde, navegador.....
    globatThis es una variable global en toda nuestra aplicación:
        *En el navegador apunta a Window
        *En node apunta a global
        *Como buena práctica, debería de usarse globalThis
        *Todo lo que aparentemente sale como de la nada, salen de la variable global globalThis
    Patrón de diseño, separamos el código en diferentes ficheros, que se podrán exportar/importar. Este patrón se llama common.js
    Es recomendable usar el patrón de export directamente en la function
    Carpetas:
        - mjs: enmmaScript
        -cjs: commonJS

    Sync/Async
        -sincrono (3.fs-readFile-sync.js), leemos el primer archivo y esperamos a que termine
        -asincrono callback (3.fs-readFile.js) leemos el primer archivo de forma asincrona, continua leyendo el código, lee el segundo fichero, termina de leer y va mostrando los datos, pero no bloquea los procesos, cuando termina de leer el primero que termine ejecuta el callback.
        -asincrono secuencial(4.fs-async-await.js)lee el primero y hasta que no termina, no ejecuta lo siguiente, el proceso si que se queda liberado, pero no continua la ejecución.
        -asincrono en paralelo (4.fs-async-await-parallel.mjs) leemos los dos a la vez y cuando terminen los dos, y ejecuta la promesa con todo resuelto.

    primer comando para crear un proyecto npm init, creará un package.json
    Para instalar un paquete: npm i picocolors
    Hay que difrenciar dos tipos de dependencias:
        -Producción: necesarias para funcionar
        -Desarrollo: npm i standard -D (-D para instalar en       desarrollo) ej:standard no será necesaria en producción ya que no vas a necesitar identar el código