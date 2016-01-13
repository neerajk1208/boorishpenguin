angular.module('boorish.dashboard', [])

.controller('DashboardController', function($scope, $location, Auth, Users) {

  Auth.setUser();

  $scope.user = {
    name: '',
    email: '', 
    image: ''
  };

  $scope.getUserInfo = function() {
    //call getuserbyID service function
    Users.getUserWithId()
      .then(function(results) {
        console.log('This was successful');
        console.log("These are the results", results.name);
        $scope.user.name = results.name;
        $scope.user.email = results.email;
        $scope.user.image = results.image;
      });
  }

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
    $scope.getUserInfo();
  }


});
