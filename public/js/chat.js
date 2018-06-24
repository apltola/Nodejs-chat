let socket = io();

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('div:last-child');

  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight + 30 >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      //we can manipulate the page the user's on with:
      window.location.href = '/';
    } else {
      console.log('yeeea baby no errors');
    }
  });
});

socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    sender: message.from,
    iat: formattedTime,
    content: message.text
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});



socket.on('newLocationMessage', function(message) {
  const divi = jQuery('<div class="message-sender"></div>');
  const ankkuri = jQuery('<a class="message-content" target=_blank>Current location</a>');

  divi.text(message.from);
  ankkuri.attr('href', message.url);
  jQuery('#messages').append(divi, ankkuri);
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  const messageInput = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'anon',
    text: messageInput.val()
  }, function() {
    messageInput.val('');
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