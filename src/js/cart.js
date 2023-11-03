import {
  getLocalStorage,
  updateCartCount,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

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
    const total = cartItems.reduce(
      (acc, item) => acc + item.FinalPrice * item.Quantity,
      0
    );

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
  // Initialize the quantity display to 1 if it's undefined
  if (item.Quantity === undefined) {
    item.Quantity = 1;
  }
  // Calculate the item's price based on the quantity
  const itemPrice = item.FinalPrice * item.Quantity;
  return `<a href="#" class="cart-card__image">
    <img
      srcset="${item.Images.PrimarySmall} 320w,
              ${item.Images.PrimaryMedium} 500w,
              ${item.Images.PrimaryLarge} 768w"
      sizes="(max-width: 320px),
             (max-width: 570px)"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="quantity-controls">
    <button class="decrease-quantity" data-index="${index}">-</button>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <button class="increase-quantity" data-index="${index}">+</button>
  </div>
  <p class="cart-card__price">$${itemPrice.toFixed(2)}</p>`;
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

// Add event listeners for quantity control buttons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("decrease-quantity")) {
    const index = event.target.getAttribute("data-index");
    decreaseQuantity(index);
  } else if (event.target.classList.contains("increase-quantity")) {
    const index = event.target.getAttribute("data-index");
    increaseQuantity(index);
  }
});

// Function to decrease quantity
function decreaseQuantity(index) {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > index) {
    if (cartItems[index].Quantity > 1) {
      cartItems[index].Quantity--;
      updateCartAndRender(cartItems);
    }
  }
}

// Function to increase quantity
function increaseQuantity(index) {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > index) {
    if (cartItems[index].Quantity === undefined) {
      cartItems[index].Quantity = 1; // Initialize to 1 if undefined
    }
    cartItems[index].Quantity++;
    updateCartAndRender(cartItems);
  }
}

// Function to update the cart and render the contents
function updateCartAndRender(cartItems) {
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
  updateCartCount(); // Call the updateCartCount function to update the cart count
}
