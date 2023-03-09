const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const educationRoutes = require('./routes/EducationRoute');
const experienceRoutes = require('./routes/ExperienceRoute');
const categoryRoutes = require('./routes/CategoryRoute');
const skillsRoutes = require('./routes/SkillsRoute');
const uploadRoutes = require('./routes/UploadRoute');
const adminRoutes =require('./routes/AdminRoute');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;
const userRoutes = require('./routes/UserRoute');
const EmailUser = require('./routes/EmailUser');
const linkedInRoute = require('./routes/LinkedInUserRoute');
const googleFacebookRoutes = require('./routes/GoogleFacebookRoute');
const githubRoutes = require('./Routes/GithubRoute');

const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());


//---------------------- Connecting to MongoDB --------------------------//
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    app.use('/', userRoutes);
    app.use('/email', EmailUser);
    app.use('/linkedIn', linkedInRoute);
    app.set('view engine', 'ejs');
    app.use('/Facebook', googleFacebookRoutes);
    app.use('/github', githubRoutes);
    app.use('/education', educationRoutes);
    app.use('/experience', experienceRoutes);
    app.use('/category', categoryRoutes);
    app.use('/skills', skillsRoutes);
    app.use('/upload', uploadRoutes);
    app.use('/Admin', adminRoutes);
    passport.serializeUser(function (user, cb) {
      cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
      cb(null, obj);
    });

    passport.use(new LinkedInStrategy({
      clientID: config.LINKEDIN_CLIENT_ID,
      clientSecret: config.LINKEDIN_CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
      scope: ['r_emailaddress', 'r_liteprofile'],
    }, function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
    ));

    passport.use(new FacebookStrategy({
      clientID: config.FACEBOOK_CLIENT_ID,
      clientSecret: config.FACEBOOK_CLIENT_SECRET,
      callbackURL: config.FACEBBOK_CALLBACK_URL,
      profileFields: ['email', 'displayName', 'id', 'picture'],
      passReqToCallback: true // pass the req object to the callback function
  }, function(req, accessToken, refreshToken, profile, done) {
    // store the user information in the session
    req.session.user = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    };
    done(null, profile);
  }));

//-------------------- Github -------------------------------//
// passport.use(new GitHubStrategy({
//   clientID: config.GITHUB_CLIENT_ID,
//   clientSecret: config.GITHUB_CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/github"
// }, function(accessToken, refreshToken, profile, cb) {
//   return cb(null, profile);
// }));

// passport.use(new GitHubStrategy({
//   clientID: config.GITHUB_CLIENT_ID,
//   clientSecret: config.GITHUB_CLIENT_SECRET_KEY,
//   callbackURL: config.GITHUB_CALLBACK_URL,
//   profileFields: ['id', 'email'],
//   passReqToCallback: true // pass the req object to the callback function
// }, function(req, accessToken, refreshToken, profile, done) {
// // store the user information in the session
// req.session.user = {
//   id: profile.id,
//   email: profile.emails[0].value
// };
// done(null, profile);
// }));
passport.use(new GitHubStrategy({
  clientID: config.GITHUB_CLIENT_ID,
  clientSecret: config.GITHUB_CLIENT_SECRET_KEY,
  callbackURL: config.GITHUB_CALLBACK_URL,
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));



//---------------- Server Listening -----------------------------//
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });
