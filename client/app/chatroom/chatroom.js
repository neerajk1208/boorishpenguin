angular.module('boorish.chatroom', [])

.controller('chatroomController', function($scope, $location, socket, Auth) {

  $scope.messages = [];
  $scope.message = '';
  
  // socket.on('init', function (data) {
  //   $scope.name = data;
  //   $scope.users = [];
  // });

  socket.on('message', function (message) {
    console.log('here');
    console.log(message);
    $scope.messages.push(message);
  });


  $scope.sendMessage = function() {
    //emit socket user connect event here
    console.log($scope.message);
    //emit send message here from socket object
    //
    socket.emit('message', {
      user: 'test-user',
      message: $scope.message
    });
    
  };

  $scope.init = function() {
    //emit socket user connect event here
    
  };


  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin') 
  } else {
    //connect user to chatroom
    $scope.init();
  }
});
