const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234 // Obtener el puerto pasandolo como parámetro en la ejecución del comando. Ej: PORT=1234 node .\9.http.js

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // Ok
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/imagen-super-bonita.png') {
    fs.readFile('./coche.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // Ok
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>404</h1>')
  }
  console.log('request received: ' + req.url) // aparece repetido dos veces el mensaje, automáticamente hace dos request, una es la petición normal y a segunda hace la petición del icono
}

// createServer, recibe una función CallBack (función que se ejecuta, después de que pase algo)
// Cada vez que recibe una request ejecuta el console.log y envia la respuesta
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
