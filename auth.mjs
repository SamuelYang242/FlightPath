// The code in this file is largely if not entirely rewritten code from auth.mjs in homework05

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');

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

const login = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw ({ message: '*Username not found' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw ({ message: "*Incorrect password" });
  }
  return user;
};

const authSession = (req, user) => {
  return new Promise((fulfill, reject) => {
    req.session.regenerate((err) => {
      if (!err) {
        req.session.user = user;
        fulfill(user);
      } else {
        reject(err);
      }
    });
  });
};

export {
  register,
  login,
  authSession,
};