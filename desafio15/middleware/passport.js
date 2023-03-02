
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("../models/user");
const bCrypt = require("bcrypt");
const express = require("express");



function isValidPassword(user, password) {
  console.log(user, password);
  return bCrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          console.log("User Not Found with email " + username);
          return done(
            null,
            false,
            req.flash("message", "Usuario no encontrado.")
          );
        }
        if (!isValidPassword(user, password)) {
          console.log("Invalid Password");
          return done(
            null,
            false,
            req.flash("message", "Contraseña incorrecta")
          );
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }
        if (user) {
          console.log("User already exists with username: " + username);
          return done(
            null,
            false,
            req.flash("message", "El usuario ya se encuentra registrado")
          );
        } else {
          const newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);
          sendGmail(newUser);
          newUser.save((err) => {
            if (err) {
              console.log("Error in Saving user: " + err);
              throw err;
            }
            console.log("User Registration succesful");

            return done(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


/* ---AUTH--- */
// function isAuth(req, res, next) {
//     if (req.isAuthenticated()) {
//         next()
//     } else {
//         res.redirect('/login')
//     }
// }


module.exports = { };