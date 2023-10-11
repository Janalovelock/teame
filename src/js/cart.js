import { getLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Check if there are items in the cart
  if (cartItems && cartItems.length > 0) {
    // Cart has items
    const productList = document.querySelector(".product-list");
    productList.innerHTML = ""; // Clear the current cart display

    cartItems.forEach((item, index) => {
      // Create a cart item element
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-card", "divider");

      // Display item details (name, price, etc.)
      cartItem.innerHTML = cartItemTemplate(item, index);

      // Create a "Remove" button
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");
      removeButton.textContent = "Remove";

      // Set up a click event listener for the "Remove" button
      removeButton.addEventListener("click", () => {
        removeFromCart(index);
        updateCartCount();
      });

      // Append the "Remove" button to the cart item
      cartItem.appendChild(removeButton);

      // Append the cart item to the product list
      productList.appendChild(cartItem);
    });

    // Calculate total price
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

    // Create HTML for total and insert it into the element
    const totalHTML = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.innerHTML = totalHTML;

    // Show the cart footer
    cartFooter.classList.remove("hide");
  } else {
    // Cart is empty
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cartItemTemplate(item, index) {
  return `<a href="#" class="cart-card__image">
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
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>`;
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > index) {
    cartItems.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents(); // Update the cart display
  }
}

renderCartContents();
