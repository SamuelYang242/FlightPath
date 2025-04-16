const map = L.map('map').setView([30, 0], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const response = await fetch('/api/user');
const user = await response.json();

async function displayFlight(flight, origin, destination) {
  const originLtLg = [origin.Latitude, origin.Longitude];
  const destinationLtLg = [destination.Latitude, destination.Longitude];

  L.marker(originLtLg).bindPopup(`<p>${origin.Name}</p>`).addTo(map);
  L.marker(destinationLtLg).bindPopup(`<p>${destination.Name}</p>`).addTo(map);
  L.polyline([originLtLg, destinationLtLg], { color: 'black', weight: '1' }).addTo(map);
}

async function addFlight(flight, origin, destination) {
  const container = document.createElement('tr');
  console.log(typeof (flight.date));
  container.classList.add("flight-container");
  container.innerHTML = `
    <td>${flight.airline + flight.flightNumber}</td>
    <td>${origin.IATA}/${origin.ICAO}</td>
    <td>${destination.IATA}/${destination.ICAO}</td>
    <td>${new Date(flight.date).toISOString().slice(0, 10)}</td>
    <td>${Math.floor(flight.duration / 60)}:${String(flight.duration % 60).padStart(2, '0')}</td>
    <td>${flight.type}</td>
  `;
  document.getElementById("flights").appendChild(container);
}

user.flights.forEach(async (flight) => {
  // Pass origin and destination information to minimize API calls
  const originResponse = await fetch(`/api/${flight.departureAirport}`);
  const origin = await originResponse.json();
  const destinationResponse = await fetch(`/api/${flight.arrivalAirport}`);
  const destination = await destinationResponse.json();

  displayFlight(flight, origin, destination);
  addFlight(flight, origin, destination);
})