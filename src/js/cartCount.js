// cartCount.js

import { updateCartCount, qs } from "./utils.mjs";

function bounceCartIcon() {
  const cartIcon = document.querySelector(".cart #svg"); // Get the cart icon

  // Apply the bounce animation to the cart icon
  cartIcon.style.animation = "bounce 0.5s ease-in-out";

  // Remove the animation after it completes (0.5 seconds)
  setTimeout(() => {
    cartIcon.style.animation = "";
  }, 500);
}

window.addEventListener("load", updateCartCount);

window.addEventListener("load", () => {
  if (!qs("#product-temp")) {
    return;
  }
  let addToCartButton;
  const cartInterval = setInterval(() => {
    addToCartButton = document.querySelector("#addToCart");
    // Listen for the "Add to Cart" button click event
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        // Trigger the bounce animation for the cart icon
        bounceCartIcon();
      });
      clearInterval(cartInterval);
    }
  }, 25);
});
