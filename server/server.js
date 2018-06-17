const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);



io.on('connection', (socket) => {

  //otetaan kiinni clientin lähettämästä uudesta viestistä
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    //io emits a message to every connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().toLocaleTimeString()
    })
  })

})

app.use(express.static(publicPath));
const PORT = process.env.PORT || 3222;
server.listen(PORT, () => console.log(`THE SERVER LIVES!! ${PORT}`));