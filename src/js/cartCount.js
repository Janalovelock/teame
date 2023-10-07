// cartCount.js

import { getLocalStorage, qs} from "./utils.mjs";
function bounceCartIcon() {
  const cartIcon = qs(".cart svg"); // Get the cart icon

  // Apply the bounce animation to the cart icon
  cartIcon.style.animation = "bounce 0.5s ease-in-out";

  // Remove the animation after it completes (0.5 seconds)
  setTimeout(() => {
    cartIcon.style.animation = "";
  }, 500);
}

function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart svg"); // Get the cart icon

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

window.addEventListener("load", () => {
  updateCartCount(); // Call the initial updateCartCount function

  // Listen for the "Add to Cart" button click event
  const addToCartButton = qs("#addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      // Handle adding the item to the cart here

      // Trigger the bounce animation for the cart icon
      bounceCartIcon();
    });
  }
});
