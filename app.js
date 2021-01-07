const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {body,validationResult} = require('express-validator');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv/config');

// MIDDLEWARE
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));
app.use(express.static(__dirname));
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));

// IMPORT ROUTES
const studentsRoute = require('./routes/students');
app.use('/students', studentsRoute);
// const postsRoute = require('./routes/posts');
// app.use('/posts', postsRoute);
// const accountsRoute = require('./routes/accounts');
// app.use('/accounts', accountsRoute);

// ROUTES
app.get('/', (req, res) => {
    res.render('pages/auth');
});

// CONNECT TO DB
mongoose
.connect(process.env.DB_CONNECTION, { dbName: 'baralaut', useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to db"))
.catch(err => console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err));

// PASSPORT SETUP
const passport = require('passport');
let userProfile;

app.use(passport.initialize());
app.use(passport.session());

// SUCCESS PAGE SETUP
app.get('/success', (req,res) => {
    res.render('pages/success', {user: userProfile})
});

app.get('/error', (req,res) => res.send('error logging in'));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// LOGOUT ROUTE
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const { post } = require('./routes/fetch-route');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://baralaut.herokuapp.com/auth/google/callback"
    // callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
});

// LISTEN TO SERVER
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));