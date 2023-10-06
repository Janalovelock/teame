// cartCount.js

import { getLocalStorage } from "./utils.mjs";

function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");

  // Retrieve cart data from local storage
  const cartItems = getLocalStorage("so-cart");

  if (cartCountElement) {
    if (cartItems && cartItems.length > 0) {
      // Update the cart count element if there are items in the cart
      cartCountElement.textContent = cartItems.length;
    } else {
      // Hide the cart count element when the cart is empty
      cartCountElement.style.display = "none";
    }
  }
}

window.addEventListener("load", updateCartCount);