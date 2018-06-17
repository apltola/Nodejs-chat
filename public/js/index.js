let socket = io();

socket.on('connect', function() {
  
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  let divi = jQuery('<div class="testi"></div>');
  divi.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(divi);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'anon',
    text: jQuery('[name=message]').val()
  }, function() {
    
  });
});