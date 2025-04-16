import express from 'express';
import mongoose from 'mongoose';

import * as util from './utils.mjs';

const router = express.Router();

const Flight = mongoose.model('Flight');
const User = mongoose.model('User');

router.get('/user', async (req, res) => {
  res.json(await req.user.populate('flights'));
})

router.get('/:airport', (req, res) => {
  const airport = req.params.airport;
  res.json(util.getAirport(airport));
})

export default router;