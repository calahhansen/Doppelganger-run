var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("logIn");
  });

  //Home
  app.get("/home", isAuthenticated, function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory outside
  app.get("/home/outside", function(req, res) {
    db.Task.findAll({ where: { category: "Outdoor Task" } }).then(function(
      dbTasks
    ) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory inside
  app.get("/home/inside", function(req, res) {
    db.Task.findAll({ where: { category: "Indoor Task" } }).then(function(
      dbTasks
    ) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory errand
  app.get("/home/errand", function(req, res) {
    db.Task.findAll({ where: { category: "Errand Run" } }).then(function(
      dbTasks
    ) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory outside
  app.get("/home/sale", function(req, res) {
    db.Task.findAll({ where: { category: "Sell Item" } }).then(function(
      dbTasks
    ) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  // Load Task page and pass in an Task by id
  app.get("/tasks/:id", isAuthenticated, function(req, res) {
    db.Task.findOne({ where: { id: req.params.id } }).then(function(doppeldb) {
      res.render("task", {
        task: doppeldb
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("/profile", isAuthenticated, function(req, res) {
    res.render("profile");
  });

  // Render 404 page for any unmatched routes
  app.get("/logIn", function(req, res) {
    res.render("logIn");
  });

  // Render 404 page for any unmatched routes
  app.get("*", isAuthenticated, function(req, res) {
    res.render("404");
  });
};
