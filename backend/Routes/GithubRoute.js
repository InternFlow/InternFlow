const passport = require('passport');
const express = require("express");

const router = express.Router();


// router.get('/auth', passport.authenticate('github'));

// router.get('/auth/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect to dashboard.
//     res.redirect('/');
// });

router.get('/auth', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to home page.
    res.redirect('/');
});

module.exports = router;


module.exports = router;
