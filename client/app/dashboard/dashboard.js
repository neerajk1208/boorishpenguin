angular.module('boorish.dashboard', [])

.controller('DashboardController', function($scope, $location, Auth, Users) {

  Auth.setUser();

  $scope.init = function() {

  };

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
    $scope.init();
  }
});
