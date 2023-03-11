const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('index.ejs'); // load the index.ejs file
});


function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}


router.get('/profile', isLoggedIn, nocache,function (req, res) {
  if (!req.isAuthenticated()) {
     // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return res.redirect('/');;
  }

  res.render('profile.ejs', {
    user: req.user // Passer l'objet user à la page de profil si l'utilisateur est connecté
  });
});

router.get('/auth', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'],
}));

router.get('/auth/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/linkedIn/profile',
    failureRedirect: '/'
  }));

  router.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      }
      req.logout();
      //res.redirect('/');
    });
  });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;
