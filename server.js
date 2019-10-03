//Requiring necessary npm packages
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

// Require passport
var passport = require("./config/passport");

//Setting up port
var PORT = process.env.PORT || 3000;

//Require models for syncing
var db = require("./models");

//Create express app
var app = express();

// Configure Middleware needed for authentication
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// Use sessions to keep track of user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
