/*
SPEC DATABASE SETUP
Paste below into SQL, and user id into test question object

INSERT INTO courses (name) VALUES ("test");
INSERT INTO tags (test) VALUES ("test");
INSERT INTO roles (username,name,name_last,name_first,isTacher,points,RoleId) VALUES ("testuser@test.com", "test", "test","test",1,1);
*/

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
// var supertest = require('supertest');
// var app = require('../server.js');
var oAuth = require('../auth/googleAuth.js')
var db = require('../db/index.js');

describe("Legacy - Server - REST API Routes", function() {

  var ensureAuthenticatedSpy;
  var questionId;
  var answerId;
  //Insert test user id in id_user below
  var testUserId = 1;

  var testQuestion = {
    id_user: testUserId,
    text: "test post body",
    course: "test",
    tag: "test",
    title: "test post title"
  };


  before(function() {
    //important to stub before we load our app
    ensureAuthenticatedSpy = sinon.stub(oAuth, 'ensureAuth');

    ensureAuthenticatedSpy.callsArg(2);


    agent = require('supertest')
      .agent(require('../server'));


  });



  describe('QUESTION AND ANSWER ROUTES', function() {
    describe('GET ALL POSTS', function() {
      it('responds with a 200 (OK) and the json data for all questions', function(done) {
        agent
          .get('/townhall/questions')
          .expect(200, done);
      })
    })
    describe('Post New Question', function() {
      it('responds with 201 (Created) and the json data for the new question', function(done) {

        agent
          .post('/townhall/questions')
          .send(testQuestion)
          .expect(function(res) {
            expect(res.body).to.exist;
            questionId = res.body.id;
          })
          .expect(201, done);


      })
    })
    describe('Get Question By ID', function() {
      it('responds with a 200 (OK) and the json data for the question', function(done) {
        agent
          .get('/townhall/questions/' + questionId)
          .expect(function(res) {
            expect(res.body.results[0]).to.contain({
              text: 'test post body',
              isAnAnswer: false,
              points: 0,
              responses: 0,
              isAnswered: false,
              isGood: false,
              isClosed: false,
              coursename: 'test',
              tagname: 'test',
              user: 'test',
              userid: 1,
            })
          })
          .expect(200, done);
      })
    })
    describe('Mod Existing Question', function() {
      it('responds with 201 (Created) and the json data for the modded question', function(done) {
        var testMod = {
          mod: "like"
        }

        agent
          .post('/townhall/questions/' + questionId)
          .set({
            "testing": true
          })
          .send(testMod)
          .expect(function(res) {
            expect(res.body).to.exist;
          })
          .expect(201, done);


      })
    })
    describe('Post New Answer', function() {
      it('responds with 201 (Created) and the json data for the new answer', function(done) {
        var testAnswer = {
          id_question: questionId,
          id_user: {
            id: 1
          },
          text: "testAnswer"
        };
        agent
          .post('/townhall/answers')
          .send(testAnswer)
          .expect(function(res) {
            expect(res.body).to.exist;
            answerId = res.body.id;
          })
          .expect(201, done);
      })
    })

    describe('Mod Existing Answer', function() {
      it('responds with 201 (Created) and the json data for the modded answer', function(done) {
        var testMod = {
          mod: "like"
        }

        agent
          .post('/townhall/answers/' + answerId)
          .set({
            "testing": true
          })
          .send(testMod)
          .expect(function(res) {
            expect(res.body).to.exist;
          })
          .expect(201, done);
      })
    })
    describe('Delete Question', function() {
      it('responds with 204 (Removed) for successfully finding and deleting question', function(done) {
        agent
          .delete('/townhall/questions/' + questionId)
          .set({
            "testing": true
          })
          .expect(204, done);


      })
    })
    describe('Delete Answer', function() {
      it('responds with 204 (Removed) for successfully finding and deleting answer', function(done) {
        agent
          .delete('/townhall/answers/' + answerId)
          .set({
            "testing": true
          })
          .expect(204, done);
      })
    })
  })

  describe('USER ROUTES', function() {
    var testUserChange = {
      //insert test change here
      id: 1,
      username: "testuser@test.com",
      name: "test",
      name_last: "test",
      name_first: "test",
      email: null,
      RoleId: 3

    }

    describe('Get All Users', function() {
      it('responds with a 200 (OK) and the json data for all users', function(done) {
        agent
          .get('/townhall/users')
          .expect(200, done);
      })
    })

    describe('Mod Existing User', function() {
      it('responds with 201 (Created) and the json data for the modded user', function(done) {
        agent
          .post('/townhall/users')
          .send(testUserChange)
          .expect(function(res) {
            expect(res.body).to.exist;
          })
          .expect(201, done);
      })
    })
    describe('Get One User', function() {
      it('responds with 200 (OK) and the json data for the user', function(done) {
        agent
          .get('/townhall/users/' + testUserId)
          .expect(function(res) {
            expect(res.body.results).to.contain({
              name: "test"
            })
          })
          .expect(200, done);
      })
    })
    describe('Get Users By Role', function() {
      it('responds with 200 (OK) and the json data for users according to role', function(done) {
        agent
          .get('/townhall/users/roles/' + 3)
          .expect(function(res) {
            expect(res.body.results[0]).to.contain({
              RoleId: 3
            })
          })
          .expect(200, done);
      })
    })
  })
  describe('HELP REQUEST ROUTES', function() {
    var testRequest = {
      //insert test change here
      description: "test description",
      ToId: 1,
      FromId: 1
    }

    var modRequest = {
      //insert test change here
      description: "updated description",
      ToId: 1,
      FromId: 1,
      closed: true
    }

    describe('Post New Request', function() {
      it('responds with 201 (Created) and the json data for the new request', function(done) {
        agent
          .post('/townhall/helpRequest')
          .send(testRequest)
          .expect(function(res) {
            expect(res.body).to.exist;
          })
          .expect(201, done);
      })
    })

    describe('Get All Requests', function() {
      it('responds with a 200 (OK) and the json data for all requests', function(done) {
        agent
          .get('/townhall/helpRequest/' + '[1,1]')
          .expect(function(res) {
            expect(res.body.results[res.body.results.length - 1]).to.contain({
              description: "test description"
            });
            modRequest.id = res.body.results[res.body.results.length - 1].id
          })
          .expect(200, done);
      })
    })

    describe('Mod Existing Request', function() {
      it('responds with 201 (Created) and the json data for the modded request', function(done) {
        agent
          .post('/townhall/helpRequest')
          .send(modRequest)
          .expect(function(res) {
            expect(res.body).to.contain({
              description: "updated description",
              closed : true
            })
          })
          .expect(201, done);
      })
    })
  })


})