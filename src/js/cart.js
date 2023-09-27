import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Check if there are items in the cart
  if (cartItems && cartItems.length > 0) {
    // Cart has items
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Calculate total price
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

    // Create HTML for total and insert it into the element
    const totalHTML = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
    document.querySelector(".cart-footer").innerHTML = totalHTML;

    document.querySelector(".cart-footer").classList.remove("hide");
  } else {
    // Cart is empty
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();
