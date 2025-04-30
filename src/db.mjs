import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }],
  flightTime: { type: Number },
});

const FlightSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true }
});

mongoose.model('User', UserSchema);
mongoose.model('Flight', FlightSchema);