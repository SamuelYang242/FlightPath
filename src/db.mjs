import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }],
  flight_time: { type: Number },
  favoriteAirports: [{ type: String }]
});

const FlightSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  airline: { type: String },
  flightNumber: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date }
});

mongoose.model('User', UserSchema);
mongoose.model('Flight', FlightSchema);