angular.module('boorish.student', [])

.controller('StudentController', function($scope, $location, Auth, Users) {

  Auth.setUser();

  $scope.requests;

  /*

  We should include a section to create help requests here. 

  Teacher's name field
  Description
  Submit
    On submit, the request should be added to the database, so we need a function to add to the database
      1. addRequest
        2. link to service function
          3. update add to the first request
  
  Here we should store request details in an object, and ng-repeat through each of the requests. In order to do this, we need the following: 

  1) $scope.requests = [];
  2) A function that runs on load of screen
    a. This function will get requests from the database by:
      1. calling a service function 
      2. then storing that response data in $scope.requests


  */

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
