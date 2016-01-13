var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
// var supertest = require('supertest');
// var app = require('../server.js');
var oAuth = require('../auth/googleAuth.js')
var db = require('../db/index.js');

describe("Legacy - Server - REST API Routes", function() {

  var ensureAuthenticatedSpy;

  before(function() {
    console.log('before setup')
      //important to stub before we load our app
    ensureAuthenticatedSpy = sinon.stub(oAuth, 'ensureAuth');

    ensureAuthenticatedSpy.callsArg(2);


    agent = require('supertest')
      .agent(require('../server'));


  });



  describe('/townhall/questions', function() {
    describe('GET', function() {
      it('responds with a 200 (OK) and the json data for all questions', function(done) {
        agent
          .get('/townhall/questions')
          .expect(200, done);
      })
    })

    describe('POST', function() {
      it('responds with 201 (Created) and the json data for the new question', function(done) {
        var testQuestion = {
          text: "test",
          id_user: "2",
          course: "test2",
          tag: "test2",
          title: "test"
        };

        agent
          .post('/townhall/questions')
          .send(testQuestion)
          .expect(function(res) {
            expect(res.body).to.exist;
            console.log(res.body.id)
          })
          .expect(201, done);


      })
    })
  })
})