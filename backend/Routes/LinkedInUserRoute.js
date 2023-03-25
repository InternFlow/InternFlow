const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get('/', function (req, res) {
  res.render('index.ejs'); // load the index.ejs file
});


function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}


router.get('/auth', function(req, res) {
  const redirectUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2FlinkedIn%2Fauth%2Fcallback&scope=r_emailaddress%20r_liteprofile&client_id=78gbaa5pmaau37`;
  res.json({ url: redirectUrl });
});


router.get('/auth/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {

  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });
   //res.json({ token,user });

  const userData = {
    linkedinId: req.user.linkedinId,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    id:req.user.id,
  };
  console.log("Redirection en cours...");
  res.redirect(`http://localhost:3000/linkedIn?linkedinId=${userData.linkedinId}&Id=${userData.id}&name=${userData.name}&email=${userData.email}&role=${userData.role}&token=${token}`);
  });

/*


router.get('/auth/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), async (req, res) => {
  try {
    // Récupérer les données utilisateur depuis LinkedIn en utilisant le code d'autorisation
    const userData = await linkedInAPI.getUserData(req.query.code);

    // Rediriger l'utilisateur vers votre application React avec les données utilisateur en tant que paramètres de requête
    res.redirect(`http://localhost:3000/?linkedinId=${userData.linkedinId}&name=${userData.name}&email=${userData.email}&role=${userData.role}`);
  } catch (error) {
    console.error(error);
    return res.status(404).json("aaaaaaa");
  }
});

*/


  router.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      }
      req.logout();
      //res.redirect('/');
    });
  });

  router.put('/update/:linkedinId', async (req, res) => {
    const { linkedinId } = req.params;
    const { role } = req.body;

    try {
      const user = await User.findOne({ linkedinId:linkedinId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.role = role;
      console.log(user);
      await user.save();

      return res.json({ message: 'Role updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;
