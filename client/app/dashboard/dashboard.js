angular.module('boorish.dashboard', [])

.controller('DashboardController', function($scope, $location, Auth, Users) {

  // Auth.setUser();

  $scope.user = {
    name: '',
    email: '', 
    image: '', 
    RoleId: ''
  };

  $scope.getUserInfo = function() {
    //call getuserbyID service function
    Users.getUserWithId()
      .then(function(results) {
        console.log('This was successful');
        console.log("These are the results", results);
        $scope.user.name = results.name;
        $scope.user.email = results.email;
        $scope.user.image = results.image;
        $scope.user.RoleId = results.RoleId;

        if ($scope.user.RoleId === 1) {
          console.log('hi');
          console.log($scope.user);
          $location.path('/dashboard/admin');
        } else if ($scope.user.RoleId === 2) {
          $location.path('/dashboard/teacher');
        } else if ($scope.user.RoleId === 3) {
          $location.path('/dashboard/student');
        }

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
