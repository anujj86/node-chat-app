const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



const {generateMessage} = require('./utils/message');
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

  // socket.emit('newMessage', {
  //   from: 'Anuj',
  //   text: 'Watching Movie',
  //   createdAt: 14524
  // })


  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));


  socket.on('createMessage', (message) => {
    console.log('CreateMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    //brodcasting

      // socket.broadcast.emit('newMessage', {
      //   from: message.from,
      //   text: message.text,
      //   createdAt: new Date().getTime()
      // });

  });

  socket.on('disconnect', () => {
    console.log('new user disconnected');
  });
});




server.listen(port, (req, res) => {
  console.log(`Server is up on ${port}`);
});
