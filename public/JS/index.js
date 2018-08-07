var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@gmail.com',
  //   text: 'hey it\'s andrew.'
  // });

  // socket.emit('createMessage', {
  //   from: 'Anuj Jain',
  //   text: 'Hello'
  // });




});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New Email', email );
// });


socket.on('newMessage', function (message) {
  console.log('newMessage', message );
})
