var db = require('../db/index.js');

module.exports = {
  allUsers: function(req, res) {
    var course = req.body.coursename;

    db.User.findAll()
    .then(function(users) {
      var formattedUsers = users.map(function(user) {
        return {
          id: user.id,
          // isTeacher: user.isTeacher,//change this to role
          username: user.username,
          name: user.name,
          name_first: user.name_first,
          name_last: user.name_last,
          email: user.email,
          points: user.points,
          image: user.picture,
          RoleId: user.RoleId
        }
      });

      users = {};
      users.results = formattedUsers;
      res.json(users);
    });
  },

  oneUser: function(req, res) {
    var uid = req.params.id;
    db.User.findById(uid)
    .then(function(user) {
      var formattedUser = {
        id: user.id,
        // isTeacher: user.isTeacher,
        name: user.name,
        name_first: user.name_first,
        name_last: user.name_last,
        email: user.email,
        points: user.points,
        image: user.picture,
        RoleId: user.RoleId
      }

      user = {};
      user.results = formattedUser;
      res.json(user);
    });
  },

  readRole: function(req, res) {
    roleId = req.params.roleId;//pulls the roleId from the route
    db.User.findAll({
      where: {
        RoleId: roleId
      }
    })
    .then(function(users) {
      var formattedUsers = users.map(function(user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          RoleId : user.RoleId
        }
      });

      userRoles = {};
      userRoles.results = formattedUsers;
      res.json(userRoles);
    })
  },

  
  modUser: function(req, res){
    var body = req.body

    db.User.findById(body.id)
    .then(function(user){
      user.update({
        username: body.username,
        name: body.name,
        name_last: body.name_last,
        name_first: body.name_first,
        email: body.email,
        RoleId: body.RoleId
      }).then(function() {
          res.status(201).json(user);
      })
    });
  },


  newUser: function(user) {
    var myUser = user
    myUser.RoleId = 3;
    db.User.create(myUser)
    .then(function(myUser){
      return myUser;
    });
  },

  isUserInDb: function(uname, callback) {
    db.User.count({
      where: {
        username: uname
      }
    })
    .then(function(number) {
      callback(!!number);
      return;
    });
  },

  isUserTeacher: function(uname, callback) { //TODO: figure out where this shit is used and take it out/edit it to work with the new roles table.
    db.User.find({//this is used in modAnswer in the Answer Controller.
      where: {
        username: uname
      }
    })
    .then(function(user) {
      callback(user.RoleId);
      return;
    })
  }
};
