const express = require("express");
const socketio = require("socket.io");
const http = require("http");
// const cors = require("cors");

const PORT = process.env.PORT || 5000;
const router = require("./router.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//controller
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

io.on("connection", (socket) => {
  // console.log(socket);
  socket.on('join', ({ name, room }, callback) => {
    console.log('user connected');
    const { error, user } = addUser({ id: socket.id, name, room });
    // console.log('this:',{user});
    if (error) return callback(error);
    socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to in room ${user.room}` });
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, telah bergabung!!` });
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    callback();
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { user: user.name, users: getUsersInRoom(user.room)});

    callback();
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} telah keluar` })
    }
  })
});

app.use(router);
// app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
