var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var db = require('../config/db');
const GoogleUser = require ('../models/GoogleUser')

var router = express.Router();
passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/auth/oauth2/redirect/google',
  scope: [ 'profile', 'email' ]
}, (issuer, profile, email, done) => {
    console.log(profile,issuer, profile.photos)
    new GoogleUser({
      googleId: profile.id,
      googleEmail: profile.emails,
      googleUserName: String,
    })

  // db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
  //   issuer,
  //   profile.id
  // ], function(err, row) {
  //   if (err) { return cb(err); }
  //   if (!row) {
  //     db.run('INSERT INTO users (name) VALUES (?)', [
  //       profile.displayName
  //     ], function(err) {
  //       if (err) { return cb(err); }

  //       var id = this.lastID;
  //       db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
  //         id,
  //         issuer,
  //         profile.id
  //       ], function(err) {
  //         if (err) { return cb(err); }
  //         var user = {
  //           id: id,
  //           name: profile.displayName
  //         };
  //         return cb(null, user);
  //       });
  //     });
  //   } else {
  //     db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
  //       if (err) { return cb(err); }
  //       if (!row) { return cb(null, false); }
  //       return cb(null, row);
  //     });
  //   }
  // });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/main',
  failureRedirect: '/login'
}));

module.exports = router;