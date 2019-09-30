const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Use local strategy.  i.e. login with email and password
passport.use(
  new LocalStrategy(
    //sign in using email
    {
      usernameField: "email"
    },
    function(email, password, done) {
      //attempt to login then code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        //if no user with that email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        //if there is a user with the email but the password is incorrect.
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        //if none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);
//Boilerplate Sequelize to keep authentication state across HTTP requests
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//Export configured passport
module.exports = passport;
