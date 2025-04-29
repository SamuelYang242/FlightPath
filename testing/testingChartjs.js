const myChart = document.getElementById('myChart');

const data = {
  labels: [1, 2, 3, 4, 5],
  datasets: [{
    data: [1, 2, 3, 4, 5]
  }]
};

const config = {
  type: "pie",
  data: data,
  options: {
    plugins: {
      title: {
        text: "one to five",
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

new Chart("myChart", config);