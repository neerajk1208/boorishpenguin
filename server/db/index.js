var Sequelize = require('sequelize');

var database = process.env.DATABASE || 'bp';
var dbUser = process.env.DBUSER || 'root';
var dbPass = process.env.DBPASS || 'password';
var dbHost = process.env.DBHOST || '127.0.0.1';

var db = new Sequelize(database, dbUser, dbPass, {
  logging: false,
  host: dbHost
});

var User = db.define('User', {
  username: Sequelize.STRING,
  name: Sequelize.STRING,
  name_last: Sequelize.STRING,
  name_first: Sequelize.STRING,
  // isTeacher: {
  //   type: Sequelize.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false
  // },
  //comment out above column, the join to role table will be created below.
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  email: Sequelize.STRING,
  picture: Sequelize.STRING
}, {
  timestamps: false
});

var Tag = db.define('Tag', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Course = db.define('Course', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Post = db.define('Post', {
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  isAnAnswer: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  responses: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isAnswered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isClosed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  updatedAt: Sequelize.DATE
});

var Like = db.define('Like', {
  }, {
    timestamps: false
});


var Role = db.define('Role',{
    roleName: Sequelize.STRING
  }, {
    timestamps: false
})

var HelpRequest = db.define('HelpRequest', {
    description: Sequelize.STRING,
    closed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    timestamps: false
})


Course.belongsToMany(User, {
  through: 'CourseUser'
});
User.belongsToMany(Course, {
  through: 'CourseUser'
});


User.belongsTo(Role); //should create a foreign key in the users table that refers to role

HelpRequest.belongsTo(User, {as: "To"});//creates two foreign keys, each called name + Id. So, HelpRequest now has a ToId and a FromId column, both referring to the user table
HelpRequest.belongsTo(User, {as: "From"});



User.hasMany(Post);
Post.belongsTo(User);
Tag.hasMany(Post);
Post.belongsTo(Tag);
Course.hasMany(Post);
Post.belongsTo(Course);
Post.hasMany(Post, {as: 'Responses', foreignKey: 'QuestionId'});

Post.belongsToMany(User, {as: 'Vote', through: 'Like'});
User.belongsToMany(Post, {through: 'Like'});

Role.sync()
.then(function(){
  return User.sync()
})
.then(function() {
  return Tag.sync();
})
.then(function() {
  return Course.sync();
})
.then(function() {
  return Post.sync();
})
.then(function() {
  return Like.sync();
})
.then(function(){
  return HelpRequest.sync();
})


//***Prepopulate Role Table***
//This is Raw SQL, to be run once on each dev environment, and once before deployment
/*
INSERT INTO roles (roleName) VALUES ("Administrator");
INSERT INTO roles (roleName) VALUES ("Teacher");
INSERT INTO roles (roleName) VALUES ("Student");
*/



exports.User = User;
exports.Course = Course;
exports.Tag = Tag;
exports.Post = Post;
