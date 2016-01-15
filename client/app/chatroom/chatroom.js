angular.module('boorish.chatroom', [])

.controller('chatroomController', function($scope, $location, socket, Auth, $stateParams) {

  $scope.messages = [];
  $scope.message = {};

  $scope.roomId = $stateParams.id;
  var roomName = 'room-' + $scope.roomId;

  // socket.on('init', function (data) {
  //   $scope.name = data;
  //   $scope.users = [];
  // });

  //need chatroom id
  
  socket.on('message', function(message) {
    console.log('client get message');
    $scope.messages.push(message);
  });

  $scope.sendMessage = function() {
    //emit socket user connect event here
    console.log($scope.message);
    //emit send message here from socket object

    var message = {
      user: 'test-user',
      room: roomName,
      message: $scope.message
    };

    socket.emit('message', message);

    $scope.messages.push(message);
  };

  $scope.init = function() {
    //emit socket user connect event here
    socket.emit('enter', {
      user: 'name',
      room: roomName
    });
  };

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin')
  } else {
    //connect user to chatroom
    $scope.init();
  }
});
