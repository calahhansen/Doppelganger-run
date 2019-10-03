var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("logIn");
  });

  //Home
  app.get("/home", isAuthenticated, function(req, res) {
    db.Task.findAll({
      where: {
        assigneeId: null
      }
    }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory outside
  app.get("/home/outside", isAuthenticated, function(req, res) {
    db.Task.findAll({
      where: {
        category: "Outdoor Task"
      }
    }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });


  //Home catagory inside
  app.get("/home/inside", isAuthenticated, function(req, res) {
    db.Task.findAll({
      where: {
        category: "Indoor Task"
      }
    }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory errand
  app.get("/home/errand", isAuthenticated, function(req, res) {
    db.Task.findAll({
      where: {
        category: "Errand Run"
      }
    }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  //Home catagory outside
  app.get("/home/sale", isAuthenticated, function(req, res) {
    db.Task.findAll({
      where: {
        category: "Sell Item"
      }
    }).then(function(dbTasks) {
      res.render("index", {
        msg: "Welcome!",
        tasks: dbTasks
      });
    });
  });

  // Load Task page and pass in an Task by id
  app.get("/tasks/:id", isAuthenticated, function(req, res) {
    db.Task.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(doppeldb) {
      res.render("task", {
        task: doppeldb
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("/profile", isAuthenticated, function(req, res) {
    db.User.findOne({
      email: req.user.email
    }).then(function(user){
      db.Task.findAll({
        where: {
          assigneeId: user.id
        }
      }).then(function(dbTasks) {
        res.render("profile", {
          msg: "Welcome!",
          tasks: dbTasks
        });
      });
    }) 
  });

  // Render 404 page for any unmatched routes
  app.get("/profile/creations", isAuthenticated, function(req, res) {
    db.User.findOne({
      email: req.user.email
    }).then(function(user){
      db.Task.findAll({
        where: {
          userId: user.id
        }
      }).then(function(dbTasks) {
        res.render("profile", {
          msg: "Welcome!",
          tasks: dbTasks
        });
      });
    }) 
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
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
