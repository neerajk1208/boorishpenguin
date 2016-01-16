var numUsers = 0;

module.exports = function(socket) {
  var addedUser = false;

  socket.emit('init', {
    name: 'name',
    users: []
  });

  socket.on('message', function(data) {
    console.log('message at server - ' + data);
    
    socket.in(data.room).broadcast.emit('message', {
      room: data.room,
      user: data.user,
      image: data.image,
      message: data.message,
      time: data.time
    });

  });

  // when the client emits 'enter', this listens and executes
  socket.on('enter', function(data) {
    socket.username = data.user;
    socket.join(data.room);

    socket.in(data.room).broadcast.emit('user joined', {
      room: data.room,
      user: data.user,
      image: data.image,
      message: data.user + ' joined help desk session...',
      time: data.time
    });
  });

  socket.on('typing', function() {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('close-request', function(data) {
    socket.broadcast.emit('close-request', {
      id: data.id
    });
  });

  socket.on('new-request', function(data) {
    socket.broadcast.emit('new-request', {
      request: true
    });
  });

  socket.on('stop typing', function() {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function() {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
}
