const heartRateElement = document.getElementById("heart-rate");
const heartRateCanvas = document.getElementById("heart-rate-graph");
const ctx = heartRateCanvas.getContext('2d');

const heartRateData = [];
const maxDataPoints = 120;

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Heart Rate',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      data: heartRateData,
    }]
  },
  options: {
    scales: {
      x: {
        display: false, // Set to false to hide x-axis labels
      },
      y: {
        suggestedMin: getMinValue(),
        suggestedMax: getMaxValue(),
      }
    },
    backgroundColor: 'transparent',
    maintainAspectRatio: false,
    gridLines: {
      x: false,
      y: {
        display: false, // Set to false to hide y-axis grid lines
      },
    },
    animation: {
      duration: 0
    }
  }
});

function updateHeartRate() {
  fetch("get_data.php")
    .then(response => response.text())
    .then(data => {
      const newHeartRate = parseInt(data);
      const timestamp = new Date();

      if (heartRateData.length > maxDataPoints - 1) {
        heartRateData.shift();
      }

      heartRateData.push({
        x: timestamp,
        y: newHeartRate
      });

      chart.data.datasets[0].data = heartRateData.map(point => point.y);
      const labels = heartRateData.map(point => point.x.toLocaleTimeString());
      chart.data.labels = labels.slice(-maxDataPoints);
      chart.options.scales.y.suggestedMin = getMinValue();
      chart.options.scales.y.suggestedMax = getMaxValue();
      chart.update();

      heartRateElement.textContent = newHeartRate;
    });
}

function getMinValue() {
  return Math.min(...heartRateData.map(point => point.y)) - 15;
}

function getMaxValue() {
  return Math.max(...heartRateData.map(point => point.y)) + 15;
}

updateHeartRate();
setInterval(updateHeartRate, 1000);
