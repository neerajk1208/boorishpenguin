var numUsers = 0;

module.exports = function(socket) {
  var addedUser = false;

  socket.emit('init', {
    name: 'name',
    users: []
  });

  //todo - private chat by room id
  socket.on('message', function(data) {
    console.log('message at server - ' + data);
    socket.in(data.room).broadcast.emit('message', {
      room: data.room,
      user: data.user,
      message: data.message
    });
  });

  // when the client emits 'enter', this listens and executes
  socket.on('enter', function(user) {
    console.log('user entered room:' + user.room);
    socket.username = user.username;
    socket.join(user.room);

    //socket.emit('entered', user);

    // echo globally (all clients) that a person has connected
    socket.in(user.room).broadcast.emit('user joined', {
      name: user.username,
      room: user.room
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function() {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
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
