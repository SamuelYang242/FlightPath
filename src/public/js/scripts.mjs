const map = L.map('map').setView([30, 0], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const JFK = [40.6446, -73.7797];
const LHR = [51.4680, -0.4551];

L.marker([40.6446, -73.7797]).bindPopup('<p>JFK</p>').addTo(map);
L.marker([51.4680, -0.4551]).bindPopup('<p>LHR</p>').addTo(map);

const points = [JFK, LHR]
L.polyline(points, { color: 'black' }).addTo(map); 