angular.module('boorish.admin', [])

.controller('AdminController', function($scope, $location, Auth, Users) {

  Auth.setUser();

  $scope.users;

  $scope.getUsers = function() {
    //call getuserbyID service function
    Users.allUsers()
      .then(function(results) {
        //add in logic to remove current user from results
        $scope.users = results;
        console.log($scope.users.results)
      })
  };

  $scope.getTemplate = function(user) {

  };

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
    $scope.getUsers();
    console.log("I'm here");
  }


});
