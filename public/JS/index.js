var socket = io();

function scrollToBottom () {
    //selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('p:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
}


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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {from : message.from,text: message.text, createdAt: formattedTime})
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li class="indigo-text text-lighten-1" style="margin-left: 10px"></li>');
  // li.text(`${message.from} : ${message.text} : ${formattedTime}`);
  // jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template, {from : message.from, href: message.url, createdAt: formattedTime})
  jQuery('#locations').append(html);
  scrollToBottom();
  // var li = jQuery('<li class="indigo-text text-Darken-1" style="margin-left: 10px"></li>');
  // var a = jQuery('<a target="_blank">My current Location</>')
  // li.text(`${message.from} | ${formattedTime} | `);
  // a.attr('href', message.url);
  // li.append(a);
  jQuery('#Locations').append(html);
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
