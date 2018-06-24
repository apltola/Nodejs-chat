const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

io.on('connection', (socket) => {
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.username) || !isRealString(params.room)) {
      callback('username & room name are required!');
    } else {
      
      //websocketti toimii nätisti... socket.joinilla päästään johonkin tiettyyn kantaan antamalla vaan stringi
      socket.join(params.room);

      //remove the user from any other room
      users.removeUser(socket.id);

      //add the user to the new room
      users.addUser(socket.id, params.username, params.room);
      console.log('users.users :', users.users);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin-botti', 'welcome to turpakii_v2.0!'))
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin-botti', `${params.username} joined the chat`))
      callback();
    }
  });
  
  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin-botti', `${user.name} left the chat`));
    }
  });
})

app.use(express.static(publicPath));
const PORT = process.env.PORT || 3222;
server.listen(PORT, () => console.log(`THE SERVER LIVES!! ${PORT}`));