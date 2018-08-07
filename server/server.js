const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(__dirname + '/../public');
console.log(publicPath);


var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit('newEmail', {
  //   from: 'anujj89@gmail.com',
  //   text: 'Hey What\'s going on',
  //   createAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // })

  socket.emit('newMessage', {
    from: 'Anuj',
    text: 'Watching Movie',
    createdAt: 14524
  })

  socket.on('createMessage', (message) => {
    console.log('CreateMessage', message);
  })

  socket.on('disconnect', () => {
    console.log('new user disconnected');
  });
});




server.listen(port, (req, res) => {
  console.log(`Server is up on ${port}`);
});
