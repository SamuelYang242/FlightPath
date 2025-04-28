const myChart = document.getElementById('myChart');

const config = {
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5],
    datasets: [{
      data: [1, 2, 3, 4, 5]
    }]
  },
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