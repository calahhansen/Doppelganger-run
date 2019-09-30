var db = require("../models");

module.exports = function(app) {
  // Load logIn page
  app.get("/", function(req, res) {
    res.render("logIn");
  });

  app.get("/home", function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  // Load Task page and pass in an Task by id
  app.get("/tasks/:id", function(req, res) {
    db.Task.findOne({ where: { id: req.params.id } }).then(function(doppeldb) {
      res.render("task", {
        task: doppeldb
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
