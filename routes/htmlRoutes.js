var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {

    // res.render("logIn");
    res.render("profileupdate");
  });
  // =============^^^ profile updat===========

  //Home
  app.get("/home", function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

   //Home catagory outside
  app.get("/home/outside", function(req, res) {
    db.Task.findAll({ where: { category: "Outdoor Task" } }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory inside
  app.get("/home/inside", function(req, res) {
    db.Task.findAll({ where: { category: "Indoor Task" } }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory errand
  app.get("/home/errand", function(req, res) {
    db.Task.findAll({ where: { category: "Errand Run" } }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory outside
  app.get("/home/sale", function(req, res) {
    db.Task.findAll({ where: { category: "Sell Item" } }).then(function(dbTasks) {
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
  app.get("/profile", function(req, res) {
    res.render("profile");
  });

  // Render 404 page for any unmatched routes
  app.get("/logIn", function(req, res) {
    res.render("logIn");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// //===============================Login/Register ROUTES========================== (CALAH set-up PLEASE PLEASE double check....I was guessing a lot!)
// // Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

// module.exports = function(app) {
//   app.get("/", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/index");
//     }
//     res.sendFile(path.join(__dirname, "../public/html/logIn.html"));
//   });

//   app.get("/login", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/index");
//     }
//     res.sendFile(path.join(__dirname, "../public/html/login.html"));
//   });

//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/index", isAuthenticated, function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/html/logIn.html"));
//   });
// };
