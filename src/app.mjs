import './config.mjs';
import './db.mjs';
import * as auth from './auth.mjs';
import * as util from './utils.mjs';
import apiRoutes from './apiRoutes.mjs';

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
app.use('/api', apiRoutes);

const Flight = mongoose.model('Flight');
const User = mongoose.model('User');

// This is just here to handle the expected vs unexpected errors
const displayErrors = ['*Please enter a username and password', '*Password must be 8 characters or more', '*Username already exists'];


app.set('views', path.join(__dirname, 'views')); // Ensure codespaces can find views folder in src
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
  if (req.user) {
    res.redirect('/account');
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
    const error = req.flash('error')[0];
    if (!error) {
      res.render('login');
    }
    else {
      res.render('login', { error: '*' + error });
    }
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/login',
  failureFlash: true
}));

app.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
})

app.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/account');
  }
  else {
    res.render('register');
  }
});

app.post("/register", async (req, res, next) => {
  const username = sanitize(req.body.username);
  try {
    const user = await auth.register(username, req.body.password);
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      else {
        return res.redirect('/account');
      }
    });
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
    const flightStr = `${Math.floor(req.user.flightTime / 60)}H ${String(req.user.flightTime % 60).padStart(2, '0')}M`;
    res.render('account', ({ user: req.user, flightTime: flightStr }));
  }
});

app.get('/add', (req, res) => {
  if (req.isUnauthenticated()) {
    res.redirect('/login');
  }
  else {
    res.render('add', ({ user: req.user }));
  }
})

app.post('/add', async (req, res) => {
  try {
    util.checkFlightErrors(req.body);
    const airline = util.getAirline(req.body.flight.toUpperCase().trim());
    const flightNumber = util.getNumber(req.body.flight.toUpperCase().trim(), airline);
    const hours = req.body.hours || 0;
    const minutes = req.body.minutes || 0;
    const newFlight = new Flight({
      airline: airline.ICAO === "N/A" ? airline.IATA : airline.ICAO,
      flightNumber: flightNumber,
      departureAirport: req.body.origin.toUpperCase(),
      arrivalAirport: req.body.destination.toUpperCase(),
      duration: Number(hours * 60) + Number(minutes),
      date: new Date(req.body.date),
      type: req.body.type,
      user: req.user._id
    });
    await newFlight.save();
    const user = await User.findById(req.user._id);
    user.flights.push(newFlight._id);
    user.flightTime += newFlight.duration;
    await user.save();
    res.redirect('/account');
  }
  catch (err) {
    res.render('add', { user: req.user, error: err.message });
  }
})

// Intermediate step, it just processes the airport input and then redirects to the right airport page
app.get('/airport', (req, res) => {
  const airport = util.getAirport(req.query.airport.toUpperCase().trim());
  if (!airport) {
    console.log("NOT FOUND");
  }
  else {
    res.redirect(`/weather/${airport.ICAO}`);
  }
})

app.get('/weather/:airport', async (req, res) => {
  const airport = util.getAirport(req.params.airport);
  const result = await fetch(`https://aviationweather.gov/api/data/metar?ids=${airport.ICAO}&format=json&taf=false`);
  const raw = (await result.json())[0];
  if (!raw) {
    console.log("No METAR");
    return;
  }
  const filtered = {
    name: raw.name,
    ICAO: raw.icaoId,
    tempC: Math.round(raw.temp),
    tempF: Math.round(raw.temp * 1.8 + 32),
    wspd: Math.round(raw.wspd * 1.15),
    wgst: raw.wgst ? Math.round(raw.wgst * 1.15) : null,
    visib: raw.visib,
    altimHPA: raw.altim,
    altimINHG: (raw.altim * 0.03).toFixed(2),
    clouds: "",
    notes: "",
  };
  filtered.clouds = util.describeClouds(raw.clouds);
  filtered.notes = util.describePrecip(raw.wxString);
  console.log(filtered);
  res.render('airport', { weather: filtered });
})

app.listen(process.env.PORT || 3000);
