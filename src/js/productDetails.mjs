import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";

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
export async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);

  addProductToCart(product);
}

async function renderProductDetails(){
  const product = await getParam("product")
  console.log(product)

  const temp = document.querySelector("#product-temp");

  const newProduct = document.importNode(temp.textContent, true)

  newProduct.querySelector("h3").textContent = product.Brand.Name
  newProduct.querySelector("h2.divider").textContent = product.NameWithoutBrand

  newProduct.querySelector("img.divider").src = product.Image
}

export function productDetails(productID){
  renderProductDetails()
}