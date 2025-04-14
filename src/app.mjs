import './config.mjs';
import './db.mjs';
import * as auth from './auth.mjs';

import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';
import path from 'path'
import { fileURLToPath } from 'url';
import passport from 'passport';
import flash from 'connect-flash';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const User = mongoose.model('User');
const Flight = mongoose.model('Flight');

const displayErrors = ['*Username not found', '*Incorrect password', '*Please enter a username and password', '*Password must be 8 characters or more', '*Username already exists'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect('/account')
  }
  else {
    res.render('home');
  }
});


app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/account');
  }
  else {
    res.render('login', { error: req.flash('error')[0] });
  }
});

//https://www.passportjs.org/howtos/password/
app.post('/login', passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/account');
  }
  else {
    res.render('register');
  }
});

// Inspired by code from app.mjs in homework05
app.post("/register", async (req, res) => {
  const username = sanitize(req.body.username);
  try {
    const user = await auth.register(username, req.body.password);
    // https://www.passportjs.org/concepts/authentication/login/
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      else {
        return res.redirect('/account');
      }
    })
  }
  catch (err) {
    if (displayErrors.includes(err.message)) {
      res.render('register', { error: err.message });
    }
    else {
      res.render('register', { error: "*Registration error" });
    }
  }
});

app.get('/account', (req, res) => {
  if (req.isUnauthenticated()) {
    res.redirect('/login');
  }
  else {
    res.render('account', ({ user: req.user }));
  }
});

app.listen(process.env.PORT || 3000);
