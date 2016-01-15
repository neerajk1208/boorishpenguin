var db = require('../db/index.js');

module.exports = {
  allRequests: function(req, res) {
    // console.log("REQPARAMS: " + req.params.idArray)
    var isFromId = req.params.idArray[0];
    var id = req.params.idArray[1];

    if(isFromId){
      db.HelpRequest.findAll({
        where: {
          FromId: id
        }
      }).then(function(helpRequests) {
        var formattedRequest = helpRequests.map(function(request) {
          return {
            id: request.id,
            description: request.description,
            FromId: request.FromId,
            ToId: request.ToId,
            closed: request.closed
          }
        });

        requests = {};
        requests.results = formattedRequest
        res.json(requests);
      })
    }else{
      db.HelpRequest.findAll({
        where: {
          ToId: id
        }
      }).then(function(helpRequests) {
        var formattedRequest = helpRequests.map(function(request) {
          return {
            id: request.id,
            description: request.description,
            FromId: request.FromId,
            ToId: request.ToId,
            closed: request.closed
          }
        });

        requests = {};
        requests.results = formattedRequest
        res.json(requests);
      })
    }
  },

  newRequest: function(req, res) {
    if(!req.body.id){
      return db.HelpRequest.create(req.body)
      .then(function(newRequest) {
        res.send(newRequest);
      })
    }
    var id = req.body.id;
    db.HelpRequest.findById(id)
    .then(function(request){
      console.log(request.description)
      request.update({
        description: req.body.description,
        closed: req.body.closed
      }).then(function() {
        res.status(201).json(request);
      })
    });
  }
};

























