var db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tasks", function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  // ===========================kong====
  // Create a new Task

  //when we create a task, we want to associate the UserId with the user that created it
  //we will be given a username from req.user.username when we have sessions properly implemented
  //we need to find the User primary key User.id that corresponds to the username from req.user.username
  //we'll apply this to a new field called UserId in req.body
  //we'll use req.body to create a new task in the Task model
  app.post("/api/tasks", function(req, res) {
    db.User.findOne({
      where: {
        name: req.user.username //could need to be modified according to when the info inside of a session actually is
      }
    }).then(function(user) {
      req.body.UserId = user.id;
      db.Task.create(req.body).then(function(dbTask) {
        res.json(dbTask);
      });
    });
  });

  //when we have a user select a task in the task selection view, an association will be made between the task and the assignee
  //the assigneeId of the task in question must be assigned the primary key of the user in question
  //username
  app.put("api/tasks", function(req, res) {});

  // Delete an Task by id
  app.delete("/api/tasks/:id", function(req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function(dbTask) {
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
  });

  app.post("/api/signup", function(req, res) {
    db.User.create(req.body)
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
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
