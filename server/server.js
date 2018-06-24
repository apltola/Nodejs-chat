const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.username) || !isRealString(params.room)) {
      callback('username & room name are required!');
    } else {
      
      //websocketti toimii nätisti... socket.joinilla päästään johonkin tiettyyn kantaan antamalla vaan stringi
      socket.join(params.room);

      socket.emit('newMessage', generateMessage('Admin-botti', 'welcome to turpakii_v2.0!'))
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin-botti', `${params.username} joined the chat`))
      callback();
    }
  });
  
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text))
    callback();
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })
})

app.use(express.static(publicPath));
const PORT = process.env.PORT || 3222;
server.listen(PORT, () => console.log(`THE SERVER LIVES!! ${PORT}`));