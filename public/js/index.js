let socket = io();

socket.on('connect', function() {
  
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});