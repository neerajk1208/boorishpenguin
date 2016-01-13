/**
 * Created by siobhan on 2016/01/06.
 */
angular.module('boorish.users', [])
  .controller('UsersController', function($scope, Users){
    $scope.newUser = {};
    $scope.toRemove = {};
    //$scope.users = [];
    $scope.users = [{'name': 'Jane'}, {'name': 'Paul'}];

    //$scope.data = {};

    $scope.addUser = function(){
      Users.addUser($scope.newUser).then(function(){
        console.log('added new user!');
      });
    };

    $scope.allUsers = function(){
      Users.allUsers().then(function(users){
        $scope.users = users;
      })
    };

    $scope.removeUser = function(){
      $scope.removeUser($scope.toRemove()).then(function(){
        console.log('removed user!');
      });
    }

    $scope.allUsers();

  });