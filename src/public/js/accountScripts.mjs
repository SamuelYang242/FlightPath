const response = await fetch('/api/user');
const user = await response.json();

/*--------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- GENERATE CHARTS ----------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/
let airlineObj = {};
let aircraftObj = {};

user.flights.forEach((flight) => {
  if (!airlineObj[flight.airline]) {
    airlineObj[flight.airline] = flight.duration;
  }
  else {
    airlineObj[flight.airline] += flight.duration;
  }
  if (!aircraftObj[flight.type]) {
    aircraftObj[flight.type] = flight.duration;
  }
  else {
    aircraftObj[flight.type] += flight.duration;
  }
})

let airlineData = {
  labels: Object.keys(airlineObj),
  datasets: [{
    label: "Minutes",
    data: Object.values(airlineObj),
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#8E44AD', '#2ECC71', '#E74C3C', '#1ABC9C', '#F39C12', '#3498DB', '#9B59B6', '#34495E']
  }]
};

let aircraftData = {
  labels: Object.keys(aircraftObj),
  datasets: [{
    label: "Minutes",
    data: Object.values(aircraftObj),
    backgroundColor: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6',
      '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000']
  }]
};

const airlineConfig = {
  type: "pie",
  data: airlineData,
  options: {
    plugins: {
      title: {
        text: "Airlines",
        display: true,
        font: {
          size: 30,
        },
        color: 'black'
      },
      legend: {
        display: false,
      }
    }
  }
}

const aircraftConfig = {
  type: "pie",
  data: aircraftData,
  options: {
    plugins: {
      title: {
        text: "Aircraft Types",
        display: true,
        font: {
          size: 30,
        },
        color: 'black'
      },
      legend: {
        display: false,
      }
    }
  }
}

new Chart(document.getElementById("airline-chart"), airlineConfig);
new Chart(document.getElementById("aircraft-chart"), aircraftConfig);

/*--------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------- GENERATE FLIGHT DISPLAY AND DATA -------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

const map = L.map('map').setView([30, 0], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function displayFlight(origin, destination) {
  const originLtLg = [origin.Latitude, origin.Longitude];
  const destinationLtLg = [destination.Latitude, destination.Longitude];

  L.marker(originLtLg).bindPopup(`<a href="/weather/${origin.ICAO}">${origin.Name}</a>`).addTo(map);
  L.marker(destinationLtLg).bindPopup(`<a href="/weather/${destination.ICAO}">${destination.Name}</a>`).addTo(map);
  L.polyline([originLtLg, destinationLtLg], { color: 'black', weight: '1' }).addTo(map);
}

async function deleteFlight(evt) {
  const row = evt.target.parentElement.parentElement;
  const flightId = row.getAttribute('id');
  await fetch(`/api/delete/${flightId}`,
    {
      method: 'DELETE'
    });

  // https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
  window.location.reload();
}


async function addFlight(flight, origin, destination) {
  const container = document.createElement('tr');
  container.classList.add("flight-container");
  container.setAttribute('id', flight._id);
  container.innerHTML = `
    <td>${flight.airline + flight.flightNumber}</td>
    <td>${origin.IATA === "N/A" ? "..." : origin.IATA}/${origin.ICAO}</td>
    <td>${destination.IATA === "N/A" ? "..." : destination.IATA}/${destination.ICAO}</td>
    <td>${new Date(flight.date).toISOString().slice(0, 10)}</td>
    <td>${Math.floor(flight.duration / 60)}:${String(flight.duration % 60).padStart(2, '0')}</td>
    <td>${flight.type}</td>
  `;
  const deleteBtn = document.createElement('td');
  deleteBtn.innerHTML = '<i class="material-icons">delete</i>';
  deleteBtn.addEventListener("click", deleteFlight);
  container.appendChild(deleteBtn);
  document.getElementById("flights").appendChild(container);
}

user.flights.forEach(async (flight) => {
  // Pass origin and destination information as arguments to reduce duplicate API calls
  const originResponse = await fetch(`/api/${flight.departureAirport}`);
  const origin = await originResponse.json();
  const destinationResponse = await fetch(`/api/${flight.arrivalAirport}`);
  const destination = await destinationResponse.json();

  displayFlight(origin, destination);
  addFlight(flight, origin, destination);
})