function updateHeartRate() {
  fetch("get_data.php")
    .then(response => response.text())
    .then(data => {
      const newHeartRate = parseInt(data);
      const heartRateElement = document.getElementById("heart-rate-number"); // Target an element for display

      // Update displayed heart rate
      heartRateElement.textContent = newHeartRate;
    });
}

updateHeartRate();
setInterval(updateHeartRate, 1000); 