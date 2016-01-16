angular.module('boorish.teacher', [])

.controller('TeacherController', function($scope, $location, socket, Auth, Users, Requests) {

  //reference the Requests factory in the controller as a dependency
  // Auth.setUser();

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
    results: []
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

        $scope.currentUser = results;
        if (results.RoleId === 2) {
          arrayId = [0, results.id];
        } else if (results.RoleId === 3) {
          arrayId = [1, results.id];
        }
        Requests.getAll(arrayId)
          .then(function(requests) {
            $scope.requests = requests;
            // requests.results.forEach(function(request) {
            //   console.log(request)
            //   if (request.closed === false) {
            //     $scope.requests.results.push(request);
            //   }
            // });
            $scope.requests.results.forEach(function(request) {
              Users.getUserWithId(request.FromId)
                .then(function(results) {
                  request.studentName = results.name;
                })
            })
          })

      })
  };

  $scope.removeRequest = function(id) {
    var specificRequest;
    $scope.requests.results.forEach(function(request) {
      if (request.id === id) {
        specificRequest = request;
      }
    });

    specificRequest.closed = true;
    console.log("check it out now", specificRequest);
    Requests.newRequest(specificRequest)
      .then(function(results) {
        console.log("what is it",results);
        $scope.getRequests();

        socket.emit('close-request', {
          id: specificRequest.id
        });
   })
  }

  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
     // $scope.getRequests();
    console.log("I'm here");
    $scope.getRequests();
  }

});






