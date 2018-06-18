let socket = io();

socket.on('connect', function() {
  
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  
  const senderDiv = jQuery('<div class="message-sender"></div>')
  senderDiv.text(message.from);
  
  const iat = message.createdAt.slice(0, 5);
  const timeDiv = jQuery('<div class="message-iat"></div>')
  timeDiv.text(iat);

  const contentDiv = jQuery('<div class="message-content"></div>')
  contentDiv.text(message.text);
  jQuery('#messages').append(senderDiv, timeDiv, contentDiv);
});



socket.on('newLocationMessage', function(message) {
  const divi = jQuery('<div class="message-sender"></div>');
  const ankkuri = jQuery('<a class="message-content" target=_blank>Current location</a>');

  const iat = message.createdAt.slice(0, 5);
  const timeDiv = jQuery('<div class="message-iat"></div>')
  timeDiv.text(iat);

  divi.text(message.from);
  ankkuri.attr('href', message.url);
  jQuery('#messages').append(divi, timeDiv, ankkuri);
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'anon',
    text: jQuery('[name=message]').val()
  }, function() {
    
  });
});



const locationButton = jQuery('#share-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('your browser is too old and shitty for this awesome feature');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('sorry, unable to fetch location...');
  });
});