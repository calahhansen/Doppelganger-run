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
    console.log(req.user);
  });

  app.post("/api/signup", function(req, res) {
    console.log("api/signup");
    console.log(db.User);
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

// //==========================USER ACCOUNT API ROUTES====================(CALAH set-up PLEASE review!!!)

// // Requiring models and passport
// const db2 = require("../models");

// const passport = require("../config/passport");

// module.exports = function(app) {
//   // Using the passport.authenticate middleware with our local strategy.
//   // If the user has valid login credentials, send them to the members page.
//   // Otherwise the user will be sent an error
//   app.post("/api/login", passport.authenticate("local"), function(req, res) {
//     res.json(req.user);
//   });

//   // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
//   // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
//   // otherwise send back an error
//   app.post("/api/signup", function(req, res) {
//     db2.User.create({
//       email: req.body.email,
//       password: req.body.password
//     })
//       .then(function() {
//         res.redirect(307, "/api/login");
//       })
//       .catch(function(err) {
//         res.status(401).json(err);
//       });
//   });

//   // Route for logging user out
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });

//   // Route for getting some data about our user to be used client side
//   app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//       // The user is not logged in, send back an empty object
//       res.json({});
//     } else {
//       // Otherwise send back the user's email and id
//       // Sending back a password, even a hashed password, isn't a good idea
//       res.json({
//         email: req.user.email,
//         id: req.user.id
//       });
//     }
//   });
// };
