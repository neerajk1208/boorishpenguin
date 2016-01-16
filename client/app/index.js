angular.module('boorish.main', [])

.controller('MainController', function($scope, $location, Auth, Users, Requests) {

   $scope.currentUser = JSON.parse(window.localStorage.getItem('com.boorish.user'));

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
     // $scope.getRequests();
  }


});