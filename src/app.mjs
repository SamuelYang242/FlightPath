import './config.mjs';
import './db.mjs';
import * as auth from './auth.mjs';

import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';
import path from 'path'
import { fileURLToPath } from 'url';

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

const User = mongoose.model('User');
const Flight = mongoose.model('Flight');

app.set('view engine', 'hbs');

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/login", (req, res) => {
  res.render('login');
});


app.get("/register", (req, res) => {
  res.render('register');
})

app.post("/register", async (req, res) => {
  const username = sanitize(req.body.username);
  try {
    const user = await auth.register(username, req.body.password);
    res.render('home');
  }
  catch (err) {
    console.log(err.message);
  }
  res.render('register');
})

app.listen(process.env.PORT || 3000);
