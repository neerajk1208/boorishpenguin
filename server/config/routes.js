var questionControllers = require ('../controllers/questionController.js');
var answerControllers = require ('../controllers/answerController.js');
var userControllers = require ('../controllers/userControllers.js');
var courseControllers = require ('../controllers/courseControllers.js');
var tagControllers = require ('../controllers/tagControllers.js');
var requestControllers = require ("../controllers/requestController.js")
var oAuth = require ('../auth/googleAuth.js')
var passport = require('passport');



module.exports = function(app, express) {
  
  app.get('/townhall/questions', oAuth.ensureAuth, questionControllers.allQuestions);
  app.post('/townhall/questions', oAuth.ensureAuth, questionControllers.newQuestion);
  app.delete('/townhall/questions/:id', oAuth.ensureAuth, questionControllers.deleteQuestion);

  app.get('/townhall/questions/:id', oAuth.ensureAuth, questionControllers.readQuestion);
  app.post('/townhall/questions/:id', oAuth.ensureAuth, questionControllers.modQuestion);

  app.post('/townhall/answers', oAuth.ensureAuth, answerControllers.newAnswer);
  app.post('/townhall/answers/:id', oAuth.ensureAuth, answerControllers.modAnswer);
  app.delete('/townhall/answers/:id', oAuth.ensureAuth, answerControllers.deleteAnswer);

  app.get('/townhall/users', oAuth.ensureAuth, userControllers.allUsers);

  app.post('/townhall/users', oAuth.ensureAuth, userControllers.modUser); //used to modify users to be admins.
  app.get('/townhall/users/:id', oAuth.ensureAuth, userControllers.oneUser);
  app.get('/townhall/users/roles/:roleId', oAuth.ensureAuth, userControllers.readRole);
  
  app.get('/townhall/helpRequest/:idArray', oAuth.ensureAuth, requestControllers.allRequests);//allreuests will have a toggle inside of it, in the presence of a from id, it will return all the requests with that form id, otherwise it will return all reuqests with the specified toId.
  app.post('/townhall/helpRequest', oAuth.ensureAuth, requestControllers.newRequest);//newRequest will have a toggle that checks if a userId exists for the passed in object, if it does not it will create a newUser, otherwise it will modify the specified user.

  app.post('/townhall/signup', userControllers.newUser);

  app.get('/townhall/courses', oAuth.ensureAuth, courseControllers.allCourses);

  app.get('/townhall/tags', oAuth.ensureAuth, tagControllers.allTags);

  // Client does get request to /auth/google on signin
  app.get('/auth/google',
  passport.authenticate('google', { scope:  ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me', "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"] }));

  // Server.js:38 sends get req to /auth/google/callback after user has successfully logged into google
  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // sends user to questions page after they successfully login
    res.redirect('/#/questions');
  });

  app.get('/user', oAuth.ensureAuth, function (req, res){
    // sends google user data to client so they can know whose currenty logged in
    res.json(req.user);
  });

}
