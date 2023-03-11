const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('index.ejs'); // load the index.ejs file
});

// Route pour se connecter avec Facebook
router.get('/auth', passport.authenticate('facebook', { scope: ['email'] }));

// Callback pour gérer la réponse de Facebook après la connexion
router.get('/auth/callback', passport.authenticate('facebook', {
  successRedirect: '/Facebook/profile',
  failureRedirect: '/Facebook'
}), function(req, res) {
  // Vérification de l'email
  if (!req.user.email_verified) {
    req.logout();
    res.redirect('/Facebook');
  }
});

// Route protégée pour accéder au profil de l'utilisateur
router.get('/profile', (req, res) => {
  if (isLoggedIn) {
    let email = req.user.emails ? req.user.emails[0].value : 'Aucun e-mail trouvé';

    res.send(`Bienvenue ${req.user.displayName} ! Votre email est ${email}.`);
  } else {
    res.redirect('/Facebook');
  }
});
router.get('/logout', (req, res) => {
  delete req.user;

  req.logout(function(err) {
      if(err) {
          console.log(err);
      }

      res.redirect('/Facebook');
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
