// alert Module

function createAlert(message, background, color) {
    const alert = document.createElement("p");
    alert.textContent = message;
    alert.style.backgroundColor = background;
    alert.style.color = color;
    return alert;
  }
  
  function loadAlerts() {
    fetch("../alerts.json")
      .then((response) => response.json())
      .then((data) => {
        const alertList = document.querySelector(".alert-list");
        data.forEach((alertData) => {
          const alert = createAlert(alertData.message, alertData.background, alertData.color);
          alertList.appendChild(alert);
        });
      });
  }
  
  export { loadAlerts };