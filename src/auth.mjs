import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');

const register = async (username, password) => {
  if (!username || !password) {
    throw ({ message: 'Please enter a username and password' })
  }
  if (password.length < 8) {
    throw ({ message: 'Password must be 8 characters or more' });
  }
  const query = await User.findOne({ username: username });
  if (query) {
    throw ({ message: 'Username already exists' });
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

export {
  register,
};