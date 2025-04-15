// Most of the code in this file is taken from passport documentation, largely from: 
// https://www.passportjs.org/concepts/authentication/login/

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import passport from 'passport';
import Strategy from 'passport-local';

const User = mongoose.model('User');

// Inspired by my code in auth.mjs in homework05
const register = async (username, password) => {
  if (!username || !password) {
    throw ({ message: '*Please enter a username and password' })
  }
  if (password.length < 8) {
    throw ({ message: '*Password must be 8 characters or more' });
  }
  const query = await User.findOne({ username: username });
  if (query) {
    throw ({ message: '*Username already exists' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username: username,
    password: hash,
  });

  await newUser.save();

  return newUser;
};


const verify = async (username, password, cb) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return cb(null, false, { message: 'Username not found' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return cb(null, false, { message: "Incorrect password" });
  }
  return cb(null, user);
};
passport.use(new Strategy(verify));

//https://github.com/passport/todos-express-password
passport.serializeUser((user, done) => {
  done(null, user.username);
});


//https://github.com/passport/todos-express-password
passport.deserializeUser(async (username, done) => {
  const user = await User.findOne({ username: username });
  done(null, user);
});

export {
  register,
};