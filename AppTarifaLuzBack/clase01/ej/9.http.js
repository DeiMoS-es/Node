const http = require('node:http')
const { findAvailablePort } = require('./10.free-port')
console.log(process.env)
const desiredPort = process.env.PORT ?? 3000 // Obtener el puerto pasandolo como parámetro en la ejecución del comando. Ej: PORT=1234 node .\9.http.js

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola Mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
// Para ejecutar esto en Windows set PORT=1234 ; node .\9.http.js

// Truco para usar siempre un puerto vacío, usando el puerto 0
// Ojo usar en desarrollo
// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })
