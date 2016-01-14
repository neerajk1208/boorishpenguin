angular.module('boorish.teacher', [])

.controller('TeacherController', function($scope, $location, Auth, Users) {

  Auth.setUser();

  $scope = users = [];

  $scope.getUsers = function() {
    //call getuserbyID service function
    Users.allUsers()
      .then(function(results) {
        console.log(results);
      })
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
