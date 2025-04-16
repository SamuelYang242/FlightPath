const map = L.map('map').setView([30, 0], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const response = await fetch('/api/user');
const user = await response.json();

async function displayFlight(flight) {
  const originResponse = await fetch(`/api/${flight.departureAirport}`);
  const origin = await originResponse.json();
  const destinationResponse = await fetch(`/api/${flight.arrivalAirport}`);
  const destination = await destinationResponse.json();

  const originLtLg = [origin.Latitude, origin.Longitude];
  const destinationLtLg = [destination.Latitude, destination.Longitude];

  L.marker(originLtLg).bindPopup(`<p>${origin.IATA}</p>`).addTo(map);
  L.marker(destinationLtLg).bindPopup(`<p>${destination.IATA}</p>`).addTo(map);
  L.polyline([originLtLg, destinationLtLg], { color: 'black', weight: '1' }).addTo(map);
}

user.flights.forEach((flight) => {
  displayFlight(flight);
})