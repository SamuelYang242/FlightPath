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

router.delete('/delete/:flight', async (req, res) => {
  const user = await User.findById(req.user._id);
  const flight = await Flight.findById(req.params.flight);
  await Flight.findByIdAndDelete(req.params.flight);
  const oldFlights = user.flights;
  const newFlights = oldFlights.filter((flight) => flight.toString() !== req.params.flight);
  user.flights = newFlights;
  user.flightTime -= flight.duration;
  await user.save();
  res.sendStatus(200);
});

export default router;