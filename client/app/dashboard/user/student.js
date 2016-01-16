angular.module('boorish.student', [])

.controller('StudentController', function($scope, $location, Auth, Users, Requests) {

//Reference the Requests factory in the controller as a dependency

  // Auth.setUser();
  $scope.description
  $scope.ToId;
  $scope.teacherName;
  $scope.currentUser;
  $scope.users;
  $scope.teachers = [];
  $scope.targetTeacher;

  $scope.sampleRequest = {
      FromId: 2,
      ToId: 1,
      closed: 0, 
      description: "hello testing" 
    }

  $scope.requests = {
    results: []
  }

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
        $scope.currentUser = results.id;
        if (results.RoleId === 2) {
          arrayId = [0, results.id];
        } else if (results.RoleId === 3) {
          arrayId = [1, results.id];
        }
        Requests.getAll(arrayId)
          .then(function(requests) {
            $scope.requests = requests;
            $scope.requests.results.forEach(function(request) {
              console.log('I am in here');
              Users.getUserWithId(request.ToId)
                .then(function(results) {
                  request.teacherName = results.name;
                })
            })
          })

      })
  };

  $scope.getUsers = function() {
    //call getuserbyID service function
    Users.allUsers()
      .then(function(results) {
        //add in logic to remove current user from results
        $scope.users = results;
        $scope.users.results.forEach(function(user) {
          if (user.RoleId === 2) {
            $scope.teachers.push(user);
          }
        })
      })
  };

  $scope.addRequest = function() {
      var request = { 
        description: $scope.description, 
        closed: 0, 
        ToId: $scope.targetTeacher.id, 
        FromId: $scope.currentUser
      };
      Requests.newRequest(request)
        .then(function(results) {
          $scope.getRequests();
        })
  }

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
     // $scope.getRequests();
    console.log("I'm here");
    $scope.getRequests();
    $scope.getUsers();
  }


});

/*

.factory('Requests', function($http) {
  
  return {

    getAll: function(idArray) {
      return $http({
        method: 'GET',
        url: '/townhall/helpRequest/' + idArray

      })
      .then(function(res) {
        return res.data;
      });
    }

  };
})

*/
