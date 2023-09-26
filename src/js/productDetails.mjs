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

async function renderProductDetails(product){

  const temp = document.querySelector("#product-temp");
  const newProduct = document.importNode(temp.content, true)

  newProduct.querySelector("h3").textContent = product.Brand.Name
  newProduct.querySelector("h2.divider").textContent = product.NameWithoutBrand

  let img = newProduct.querySelector("img.divider")
  img.src = product.Image
  img.alt = product.NameWithoutBrand
  newProduct.querySelector(".product-card__price").textContent = product.ListPrice
  newProduct.querySelector(".product__color").textContent = product.Colors.ColorName
  newProduct.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple
  newProduct.querySelector("#addToCart").setAttribute("data-id", product.Id)
  
  document.querySelector("main").appendChild(newProduct);

}

export async function productDetails(productID){
  let product = await findProductById(productID)
  await renderProductDetails(product)
  document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
}