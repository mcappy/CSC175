const net = require('net');
const readline = require('readline');

const command_line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


const connection = net.createConnection({
  host: '40.114.109.223',
  port: 5000
});

const xx = () => {
  // console.log('Got in touch with the server!');

  // command_line.question("Enter Message:", (message) => {
  //   connection.write(Buffer.from(message, 'utf8'));
  // })
  command_line.question("Enter a username: ", (username) => {
    console.log("Start sending messgaes!");
    command_line.setPrompt("");
    command_line.prompt();
    command_line.on('line', (message) => {
      // console.log(`${username}: ${message}`);
      connection.write(Buffer.from(`${username}: ${message}`, 'utf8'));
      command_line.prompt();
    })
  })
}

connection.on('connect', () => {
  xx();
})

connection.on('data', (data) => {
  // console.log("Received Data: ", data.toString('utf8'));
  console.log(data.toString('utf8'));
});

connection.on('end', () => {
  console.log('disconnected from server');
});