// welcomeBanner.js
// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
window.onload = function () {
  modal.style.display = "block";
};
var registerButton = document.getElementById("registerButton");
registerButton.onclick = function () {
  //registration logic would go here
};
