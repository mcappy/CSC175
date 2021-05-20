const net = require('net')
const sockets = [];
const server = new net.Server()
server.listen({
  host: '0.0.0.0',
  port: 5000
})

server.on('connection', (connection) => {
      console.log("Someone connected")
      sockets.push(connection);
      connection.on('data', (data) => {
        sockets.forEach(socket => {
          if (socket !== connection) {
            socket.write(Buffer.from(data, 'utf8'))
          }
        })
      })

      connection.on('end', () => {
        console.log("Someone left the chat!");
      })


      console.log("Listening for incoming connections")