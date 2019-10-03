const db = require("../models");
const passport = require("../config/passport");

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tasks", isAuthenticated, function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  app.get("/api/assignedTasks", isAuthenticated, function(req, res) {
    db.User.findOne({
      email: req.user.email
    }).then(function name(user) {
      db.Task.findAll({
        assigneeId: user.id
      }).then(function(tasks) {
        res.json = {
          tasks
        };
      });
    });
  });

  // ===========================kong====
  // Create a new Task

  //when we create a task, we want to associate the UserId with the user that created it
  //we will be given a username from req.user.username when we have sessions properly implemented
  //we need to find the User primary key User.id that corresponds to the username from req.user.username
  //we'll apply this to a new field called UserId in req.body
  //we'll use req.body to create a new task in the Task model
  app.post("/api/tasks", isAuthenticated, function(req, res) {
    console.log(req.user);
    db.User.findOne({
      where: {
        email: req.user.email //could need to be modified according to when the info inside of a session actually is
      }
    }).then(function(user) {
      req.body.UserId = user.id;
      db.Task.create(req.body).then(function(dbTask) {
        res.json(dbTask);
      });
    });
  });

  app.get("/api/createdTasks", isAuthenticated, function(req, res) {
    db.User.findOne({
      email: req.user.email
    }).then(function name(user) {
      db.Task.findAll({
        userId: user.id
      }).then(function(tasks) {
        res.json = {
          tasks
        };
      });
    });
  });

  //when we have a user select a task in the task selection view, an association will be made between the task and the assignee
  //the assigneeId of the task in question must be assigned the primary key of the user in question
  //username
  app.put("api/tasks", isAuthenticated, function(req, res) {
    db.User.findOne({
      where: {
        email: req.user.email //could need to be modified according to when the info inside of a session actually is
      }
    }).then(function(user) {
      db.Task.update(
        {
          assigneeId: user.id
        },
        {
          where: {
            id: req.body.id
          }
        }
      ).then(function(task) {
        res.JSON(task);
      });
    });
  });

  // Delete an Task by id
  app.delete("/api/tasks/:id", isAuthenticated, function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // Create a new Profile===kong====
  app.post("/api/profile", function(req, res) {
    console.log("dbProfile: ", req.body);

    db.Profile.create(req.body).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    // console.log(req.user);
  });

  app.post("/api/signup", function(req, res) {
    console.log("api/signup");
    // console.log(db.User);
    db.User.create(req.body)
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
};
