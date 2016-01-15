angular.module('boorish.teacher', [])

.controller('TeacherController', function($scope, $location, Auth, Users) {

  //reference the Requests factory in the controller as a dependency
  Auth.setUser();

  $scope.requests = {
    results: [
      {
        id: 1, 
        description: 'I need help with this math problem', 
        closed: 0, 
        ToId: 1, 
        FromId: 2
      }, 
      {
        id: 2, 
        description: 'What do you do now?', 
        closed: 0, 
        ToId: 1, 
        FromId: 2
      }, 
      {
        id: 3, 
        description: 'Whaaaat!', 
        closed: 0, 
        ToId: 1, 
        FromId: 2
      }
    ]
  };

  /*
  Here we should store request details in an object, and ng-repeat through each of the requests. In order to do this, we need the following: 

  1) $scope.requests = [];
  2) A function that runs on load of screen
    a. This function will get requests from the database by:
      1. calling a service function 
      2. then storing that response data in $scope.requests


  */

  $scope.getRequests = function() {
    //call getuserbyID service function
    //call the requests factory getAll function
    Requests.getAll()
      .then(function(results) {
        console.log("These are my results", results);
        $scope.requests = results;
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






