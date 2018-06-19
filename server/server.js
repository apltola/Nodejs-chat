const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message')



const app = express();
const server = http.createServer(app);
const io = socketIO(server);



io.on('connection', (socket) => {
  socket.emit('newMessage', generateMessage('Admin', 'welcome to turpakii_v2.0'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined!'))
  
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('this is from the server!');
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })
})

app.use(express.static(publicPath));
const PORT = process.env.PORT || 3222;
server.listen(PORT, () => console.log(`THE SERVER LIVES!! ${PORT}`));