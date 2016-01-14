var db = require('../db/index.js');

module.exports = {
  allUsers: function(req, res) {
    var course = req.body.coursename;

    db.User.findAll()
    .then(function(users) {
      var formattedUsers = users.map(function(user) {
        return {
          id: user.id,
          isTeacher: user.isTeacher,//change this to role
          name: user.name,
          name_first: user.name_last,
          name_last: user.name_first,
          email: user.email,
          points: user.points,
          image: user.image
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
        isTeacher: user.isTeacher,
        name: user.name,
        name_first: user.name_last,
        name_last: user.name_first,
        email: user.email,
        points: user.points,
        image: user.image
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
          email: user.email
        }
      });

      userRoles = {};
      userRoles.results = formattedUsers;
      res.json(userRoles);
    })
  },

  
  modUser: function(req, res){
    var uid = req.params.id;
    var mod = req.body.mod;
    var that = this;

    db.User.findById(uid)
    .then(function(user){
      if (mod === "admin") {
        user.update({
          RoleId: 1
        })
      }else if(mod === "teacher") {
        user.update({
          RoleId: 2
        })
      }else if(mod === "student") {
        user.update({
          RoleId: 3
        })
        .then(function() {
          res.status(201).json(user);
        })
      }else{
        res.sendStatus(404);
      }
    });
  },


  newUser: function(user) {
    db.User.create(user)
    .then(function(newUser) {
      return newUser;
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
      callback(user.isTeacher);
      return;
    })
  }
};
