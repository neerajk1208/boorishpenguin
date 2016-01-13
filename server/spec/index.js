var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var app = require('../server.js');

var db = require('../db/index.js');
app.listen(9000);
describe("Legacy - Server - REST API Routes", function() {
  describe('/townhall/questions', function() {
    describe('GET', function() {
      it('responds with a 200 (OK) and the json data for all questions', function(done) {
        supertest(app)
          .get('/townhall/questions')
          .expect(200, done);
      })
    })

    describe('POST', function() {
      it('responds with 201 (Created) and the json data for the new question', function(done) {
        var testQuestion = {
          "createdAt": {
            "fn": "NOW",
            "args": []
          },
          "isAnAnswer": false,
          "points": 0,
          "responses": 0,
          "isAnswered": false,
          "isGood": false,
          "isClosed": false,
          "id": 121,
          "title": "test-user",
          "text": "test-question",
          "UserId": 1,
          "CourseId": 22,
          "TagId": 3,
          "updatedAt": "2016-01-12T23:21:58.000Z"
        };

        supertest(app)
          .post('/townhall/questions')
          .send(testQuestion)
          // .expect(function(res) {
          //   expect(res.body).to.exist;
          // })
          .expect(201, done);


      })
    })
  })
})