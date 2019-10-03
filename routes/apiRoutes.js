var db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tasks", function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  // Create a new Profile===kong====
  app.post("/api/profile", function(req, res) {
    console.log("dbProfile: ", req.body);

    db.Profile.create(req.body).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });
  // ===========================kong====
  // Create a new Task
  app.post("/api/tasks", function(req, res) {
    db.Task.create(req.body).then(function(dbTask) {
      res.json(dbTask);
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

  // Delete an Task by id
  app.delete("/api/tasks/:id", function(req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function(dbTask) {
      res.json(dbTask);
    });
  });
};
