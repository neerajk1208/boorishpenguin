angular.module('boorish.teacher', [])

.controller('TeacherController', function($scope, $location, Auth, Users, Requests) {

  //reference the Requests factory in the controller as a dependency
  Auth.setUser();

  $scope.description
  $scope.ToId;
  $scope.currentUser;

$scope.sampleRequest = {
      FromId: 2,
      ToId: 1,
      closed: 0, 
      description: "hello testing" 
    }

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

  $scope.getRequests = function() {
    //call getuserbyID service function

    //grab current userId
    //grab role of current user
    //create arrayid based on above-mentioned results
    var arrayId = [];

    Users.getUserWithId()
      .then(function(results) {
        console.log('I am now in here');
        console.log("These are the results HERE", results);
        $scope.currentUser = results.id;
        if (results.RoleId === 2) {
          arrayId = [0, results.id];
        } else if (results.RoleId === 3) {
          arrayId = [1, results.id];
        }
        Requests.getAll(arrayId)
          .then(function(requests) {
            console.log("my requests!", requests);
            console.log('Got the corresponding requests');
            $scope.requests = requests;
          })

      })
  };

  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
     // $scope.getRequests();
    console.log("I'm here");
    $scope.getRequests();
  }

});






