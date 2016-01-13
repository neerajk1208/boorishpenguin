angular.module('boorishpenguin', [
  'boorish.services',
  'boorish.users',
  'boorish.ask',
  'boorish.questions',
  'boorish.answers',
  'boorish.auth',
  'boorish.dashboard', 
  'ngRoute', 
  'ui.router'
  ])

.config(function ($routeProvider, $stateProvider, $sceProvider, $urlRouterProvider) {
  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'app/questions/questions.html',
  //     controller: 'questionsController'
  //   })
  //   .when('/ask', {
  //     templateUrl: 'app/ask/ask.html',
  //     controller: 'askController'
  //   })
  //   .when('/questions', {
  //     templateUrl: 'app/questions/questions.html',
  //     controller: 'questionsController'
  //   })
  //   .when('/questions/:id', {
  //     templateUrl: 'app/answers/answers.html',
  //     controller: 'answersController'
  //   })
  //   .when('/users', {
  //     templateUrl: 'app/users/users.html',
  //     controller: 'UsersController'
  //   })
  //   .when('/signin', {
  //     templateUrl: 'app/auth/signin.html',
  //     controller: 'AuthController'
  //   })
  //   .when('/dashboard', {
  //     templateUrl: 'app/users/users.html',
  //     controller: 'UsersController'
  //   })
  //   .otherwise({
  //     routeTo: '/signin'
  //   })

  // $sceProvider.enabled(false);


  $urlRouterProvider.otherwise('/signin')
  $stateProvider
    .state('questions', {
      url: '/', 
      templateUrl: 'app/questions/questions.html', 
      controller: 'questionsController'
    })
    .state('q', {
      url: '/questions', 
      templateUrl: 'app/questions/questions.html',
      controller: 'questionsController'
    })
    .state('ask', {
      url: '/ask', 
      templateUrl: 'app/ask/ask.html', 
      controller: 'askController'
    })
    .state('questionid', {
      url: '/questions/:id', 
      templateUrl: 'app/answers/anwers.html', 
      controller: 'answersController'
    })
    .state('users', {
      url: '/users', 
      templateUrl: 'app/users/users.html', 
      controller: 'UsersController'
    })
    .state('signin', {
      url: '/signin', 
      templateUrl: 'app/auth/signin.html', 
      controller: 'AuthController'
    })
    .state('dashboard', {
      url: '/dashboard', 
      templateUrl: 'app/users/users.html', 
      controller: 'UsersController'
    })
});
