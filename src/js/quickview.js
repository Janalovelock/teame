const quickViewBtn = document.getElementById("quickViewBtn");
const productModal = document.getElementById("product-modal");
const closeMod = document.getElementsByClassName("close-modal")[0];

quickViewBtn.onclick = function() {
    productModal.style.display = "block";
}

closeMod.onclick = function() {
    productModal.style.display = "none";
}