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
  before(function() {
    //important to stub before we load our app
    ensureAuthenticatedSpy = sinon.stub(oAuth, 'ensureAuth');

    ensureAuthenticatedSpy.callsArg(2);


    agent = require('supertest')
      .agent(require('../server'));


  });



  describe('Questions and Answers', function() {
    describe('GET ALL POSTS', function() {
      it('responds with a 200 (OK) and the json data for all questions', function(done) {
        agent
          .get('/townhall/questions')
          .expect(200, done);
      })
    })
    describe('POST NEW QUESTION', function() {
      it('responds with 201 (Created) and the json data for the new question', function(done) {
        var testQuestion = {
          text: "test post body",
          id_user: "1",
          course: "test1",
          tag: "test1",
          title: "test post title"
        };

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
    describe('GET QUESTION BY ID', function() {
      it('responds with a 200 (OK) and the json data for the question', function(done) {
        agent
          .get('/townhall/questions/' + questionId)
          .expect(200, done);
      })
    })
    describe('MOD EXISTING QUESTION', function() {
      it('responds with 201 (Created) and the json data for the modded question', function(done) {
        var testMod = {
          mod: "good"
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
    describe('POST NEW ANSWER', function() {
      it('responds with 201 (Created) and the json data for the new answer', function(done) {
        var testAnswer = {
          id_question: questionId,
          id_user: 1,
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

    describe('MOD EXISTING ANSWER', function() {
      it('responds with 201 (Created) and the json data for the modded answer', function(done) {
        var testMod = {
          mod: "good"
        }

        agent
          .post('/townhall/questions/' + answerId)
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
    describe('DELETE QUESTION', function() {
      it('responds with 204 (Removed) for successfully finding and deleting question', function(done) {
        agent
          .delete('/townhall/answers/' + questionId)
          .set({
            "testing": true
          })
          .expect(204, done);


      })
    })
    describe('DELETE ANSWER', function() {
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
})