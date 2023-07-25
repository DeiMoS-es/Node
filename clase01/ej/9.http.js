const http = require('node:http')
const { findAvailablePort } = require('./10.free-port')

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola Mundo')
})

findAvailablePort(1234).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})

// Truco para usar siempre un puerto vacío, usando el puerto 0
// Ojo usar en desarrollo
// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })
