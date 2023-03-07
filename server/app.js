var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;



require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();

// Connection to MongoDB
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true})
.then(()=>{ console.log("Connected to DB")})
.catch((err)=>{console.log(err.message)})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/github"
}, function(accessToken, refreshToken, profile, cb) {
  // This function is called when the user is authenticated
  // You can use the access token to make API calls to the GitHub API
  // The user's GitHub profile information is available in the `profile` object
  return cb(null, profile);
}));

app.get('/github', passport.authenticate('github'));

app.get('/github',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to dashboard.
    res.redirect('/');
  });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

//Connecting a Server
const server = http.createServer(app);
server.listen(process.env.PORT||5000, ()=>{
  console.log(`App is running on localhost:${process.env.PORT}`);
})

