import { readFileSync } from 'fs';

const airlineData = JSON.parse(readFileSync("./src/public/data/airlines.json"), 'utf-8');
const airportData = JSON.parse(readFileSync("./src/public/data/airports.json"), 'utf-8');

function checkFlightErrors(info) {
  // Ensure all values are filled out except hours and minutes
  if (!info.hours && !info.minutes) {
    throw ({ message: "*Please enter all fields" });
  }
  Object.keys(info).forEach((key) => {
    if (key !== 'hours' && key !== 'minutes' && !info[key]) {
      throw ({ message: "*Please enter all fields" });
    }
  });

  // Make sure the airline actually exists
  const airline = getAirline(info.flight.toUpperCase());
  if (!airline) {
    throw ({ message: "*Please enter a valid airline code" });
  }

  // Make sure the flight number is a number (flightNumber will be NaN or empty if invalid)
  const flightNumber = getNumber(info.flight.toUpperCase(), airline);
  if (!flightNumber) {
    throw ({ message: "*Please enter a valid flight number" });
  }

  //Ensure valid origin
  const origin = getAirport(info.origin.toUpperCase());
  if (!origin) {
    throw ({ message: "*Please enter a valid origin airport" });
  }

  // Ensure valid destination
  const destination = getAirport(info.destination.toUpperCase());
  if (!destination) {
    throw ({ message: "*Please enter a valid destination airport" });
  }

  // Ensure date is in the past
  const today = new Date();
  if (new Date(info.date) >= today) {
    throw ({ message: "*Please enter a valid date in the past" });
  }

}

function getAirline(flight) {
  const IATA = flight.slice(0, 2);
  const ICAO = flight.slice(0, 3);
  const airline = airlineData.find((airline) => ICAO === airline.ICAO);
  return airline || airlineData.find((airline) => IATA === airline.IATA);
}

function getNumber(flight, airline) {
  if (airline.ICAO === flight.slice(0, 3)) {
    return Number(flight.slice(3));
  }
  else {
    return Number(flight.slice(2));
  }
}

function getAirport(input) {
  return airportData.find((airport) => input === airport.IATA || input === airport.ICAO);
}

export {
  checkFlightErrors,
  getAirline,
  getNumber
}

