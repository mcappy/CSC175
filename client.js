const net = require('net');
const readline = require('readline');

const command_line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


const connection = net.createConnection({
  host: 'CHANGE TO YOUR AZURE IP',
  port: 5000
});

const xx = () => {
  command_line.question("Enter a username: ", (username) => {
    command_line.prompt();
    command_line.on('line', (message) => {
      connection.write(Buffer.from(`${username}: ${message}`, 'utf8'));
      command_line.prompt();
    })
  })
}

connection.on('connect', () => {
  xx();
})

connection.on('data', (data) => {
  console.log(data.toString('utf8'));
});

connection.on('end', () => {
  console.log('disconnected from server');
});