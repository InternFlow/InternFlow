
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require("./models/User");
const Message = require('./models/Message');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//----------------- Passport & Authentification ------------------------//
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

//------------------ Routes -----------------------------------------//
const educationRoutes = require('./routes/EducationRoute');
const experienceRoutes = require('./routes/ExperienceRoute');
const categoryRoutes = require('./routes/CategoryRoute');
const skillsRoutes = require('./routes/SkillsRoute');
const uploadRoutes = require('./routes/UploadRoute');
const adminRoutes =require('./routes/AdminRoute');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI;
const userRoutes = require('./routes/UserRoute');
const EmailUser = require('./routes/EmailUser');
const linkedInRoute = require('./routes/LinkedInUserRoute');
const googleFacebookRoutes = require('./routes/GoogleFacebookRoute');
const githubRoutes = require('./Routes/GithubRoute');
const ProfileUserRoutes = require('./Routes/ProfileUserRoutes');
const QuizRoute = require('./Routes/QuizRoute');
const applicationcondidatRoute = require('./Routes/ApplicationconditaRoute');
const applicationInterviewRoute = require('./Routes/InterviewRoute');


const config = require('./config');


app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Origin']


}));
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
    app.use('/Condidat',ProfileUserRoutes);
    app.use('/Quiz',QuizRoute);
    app.use('/applicationquiz',applicationcondidatRoute);
    app.use('/userinterview',applicationInterviewRoute);



passport.serializeUser((user, done) => {
      done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
      const user = await User.findById(id);
      done(null, user);
  });



  passport.use(new LinkedInStrategy({
    clientID: config.LINKEDIN_CLIENT_ID,
    clientSecret: config.LINKEDIN_CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, async (req,token, tokenSecret, profile, done) =>{
    try {
      // Vérifier si l'utilisateur existe déjà dans la base de données
      let user = await User.findOne({ linkedinId: profile.id });
      if (!user) {
        user = await User.findOne({ email: profile.emails[0].value });
      }
      if (user) {
        // L'utilisateur existe déjà, renvoyer l'utilisateur existant
        return done(null, user);
      } else {
        // Enregistrer un nouvel utilisateur dans la base de données
        const newUser = new User({
          linkedinId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          role: 'new' // ou 'admin', 'company', 'formateur' selon votre logique
        });
        await newUser.save();
        return done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  }
  ));





//---------------- Server Listening -----------------------------//
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });
