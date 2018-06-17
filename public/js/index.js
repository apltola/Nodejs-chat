let socket = io();

socket.on('connect', function() {
  console.log('CONNECTED TO SERVER');

  socket.emit('createMessage', {
    from: 'richard',
    text: 'kiss my piss'
  });
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});

socket.on('disconnect', function() {
  console.log('DISCONNECTED FROM SERVER');
});