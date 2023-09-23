import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let storage = localStorage.getItem("so-cart") || null;
  if (storage != null) {
    storage = getLocalStorage("so-cart");
    setLocalStorage("so-cart", storage.concat(product));
    return;
  }
  setLocalStorage("so-cart", [product]);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);

  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
