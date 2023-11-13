const quickViewBtn = document.getElementById("quickViewBtn");
const productModal = document.getElementById("product-modal");
const closeMod = document.getElementsByClassName("close-modal")[0];
const modalText = document.getElementById("modal-text");

quickViewBtn.onclick = function() {
    productModal.style.display = "block";
}

closeMod.onclick = function() {
    productModal.style.display = "none";
}
