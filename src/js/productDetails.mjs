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
  newProduct.querySelector(".product-card__price").textContent = `$${product.ListPrice}`
  newProduct.querySelector(".product__color").textContent = product.Colors.ColorName
  newProduct.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple
  newProduct.querySelector("#addToCart").setAttribute("data-id", product.Id)
  
  document.querySelector("main").appendChild(newProduct);

}

function renderErrorPage(){
  let errorMessage = "Sorry, it looks like the product you are looking for is "
    +"not in our database."
  const temp = document.querySelector("#product-temp");
  const noProduct = document.importNode(temp.content, true)

  noProduct.querySelector("h3").remove()
  noProduct.querySelector("h2.divider").textContent = "Sorry! Product not found."

  noProduct.querySelector("img.divider").remove();

  noProduct.querySelector(".product-card__price").remove()
  noProduct.querySelector(".product__color").remove()
  noProduct.querySelector(".product__description").textContent = errorMessage;
  
  noProduct.querySelector("#addToCart").innerHTML = "<a href=\"/index.html\">Return to Home Page</a>";
  
  document.querySelector("main").appendChild(noProduct);
}

export async function productDetails(productID){
  try{
    let product = await findProductById(productID)
    if(product == undefined)
      throw new Error(`Not a valid product ID: "${productID}"`)
    await renderProductDetails(product)
    document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
  } catch (err){
    console.log(err);
    renderErrorPage();
  }
}