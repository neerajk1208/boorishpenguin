angular.module('boorish.chatroom', [])

.controller('chatroomController', function($scope, $location, socket) {
  $scope.messages = [];
  
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
