angular.module('boorish.chatroom', [])

.controller('chatroomController', function($scope, $location, socket, Auth, $stateParams) {
  // if user is not authenticated, reroute to /signin
  $scope.init = function() {
    //emit socket user connect event here
    $scope.user = Auth.getUser();

    $scope.messages = [];
    $scope.message = '';
    $scope.roomId = $stateParams.id;
    $scope.roomName = 'room-' + $scope.roomId;

    var timeStr = moment().format('hh:mm a');

    socket.emit('enter', {
      user: $scope.user.username, //user name from local storage
      room: $scope.roomName,
      message: $scope.message,
      image: $scope.user.image,
      time: timeStr
    });

    socket.on('message', function(message) {
      message.class = 'theirs';
      $scope.messages.push(message);
    });

    socket.on('user joined', function(message) {
      message.class = 'theirs';
      $scope.messages.unshift(message);
    });
  };

  $scope.sendMessage = function() {
    //emit socket user connect event here
    //emit send message here from socket object

    var timeStr = moment().format('hh:mm a');

    var message = {
      user: $scope.user.username, //user name from local storage
      room: $scope.roomName,
      message: $scope.message,
      image: $scope.user.image,
      time: timeStr
    };

    socket.emit('message', message);
    message.class = 'mine';
    $scope.messages.push(message);
    $scope.message = '';
  };

  if (!Auth.isAuth()) {
    $location.path('/signin')
  } else {
    //connect user to chatroom
    $scope.init();
  }
});
