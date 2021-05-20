const net = require('net')
const sockets = [];
const server = new net.Server()
server.listen({
  host: '0.0.0.0',
  port: 5000
})

server.on('connection', (connection) => {
  //console.log("Someone connected")
  //connection.write(Buffer.from("Hello", 'utf8'))
  sockets.push(connection);
  connection.on('data', (data) => {
    //console.log("Received Data: ", data.toString('utf8'));
    sockets.forEach(socket => {
      if (socket !== connection) {
        socket.write(Buffer.from(data, 'utf8'))
      }
    })
  })

  connection.on('end', () => {
    console.log("Someone left the chat!");
  })


  connection.on('error', function (error) {
    console.log("Someone left the chat!");
    //console.log(connection);
    // console.log('Socket got problems: ', error.message);

  });
})

console.log("Listening for incoming connections")