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
  var li = jQuery('<li class="collection-item indigo-text text-lighten-1"></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li class="collection-item indigo-text text-Darken-1"></li>');
  var a = jQuery('<a target="_blank">My current Location</>')
  li.text(`${message.from} | `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#Locations').append(li);
})

// //Acknowledgement
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hello Frank'
// }, function (data) {
//   console.log('Got it', data);
// });


//EventListener

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: jQuery('[name=username]').val(),
    text: jQuery('[name=message]').val()
  }, function () {

  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return M.toast({html: 'geolocation not supported by browser.'})
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    M.toast({html: 'unable to fetch Location'});
  });
});
