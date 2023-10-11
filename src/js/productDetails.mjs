import { setLocalStorage, updateCartCount, getLocalStorage } from "./utils.mjs";
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

// Calculate the discount percentage
function calculateDiscountPercentage(SuggestedRetailPrice, FinalPrice) {
  const discount = ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100;
  return discount.toFixed(1);
}

async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  updateCartCount();
}

async function renderProductDetails(product) {
  const temp = document.querySelector("#product-temp");
  const newProduct = document.importNode(temp.content, true);

  newProduct.querySelector("h3").textContent = product.Brand.Name;
  newProduct.querySelector("h2.divider").textContent = product.NameWithoutBrand;

  let img = newProduct.querySelector("img.divider");
  img.src = product.Image;
  img.alt = product.NameWithoutBrand;

  // Create the suggested retail price element
  const suggestedPrice = document.createElement("p");
  suggestedPrice.classList.add("price-section", "suggested-price");
  suggestedPrice.textContent = `Suggested retail price: $${product.SuggestedRetailPrice}`;

  // Create the "Your Price after Discount" element
  const discountPercentage = calculateDiscountPercentage(product.SuggestedRetailPrice, product.FinalPrice);
  const discount = document.createElement("p");
  discount.classList.add("price-section", "discount");
  discount.textContent = `Your Price after ${discountPercentage}% off:`;

  // Create the "Our Price" element
  const ourPrice = document.createElement("p");
  ourPrice.classList.add("price-section", "our-price");
  ourPrice.textContent = `$${product.FinalPrice}`;

  // Append the elements to the price section
  newProduct.querySelector(".product-card__price").appendChild(suggestedPrice);
  newProduct.querySelector(".product-card__price").appendChild(discount);
  newProduct.querySelector(".product-card__price").appendChild(ourPrice);

  newProduct.querySelector(".product__color").textContent = product.Colors.ColorName;
  newProduct.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
  newProduct.querySelector("#addToCart").setAttribute("data-id", product.Id);

  document.querySelector("main").appendChild(newProduct);
}

function renderErrorPage() {
  let errorMessage =
    "Sorry, it looks like the product you are looking for is not in our database.";
  const temp = document.querySelector("#product-temp");
  const noProduct = document.importNode(temp.content, true);

  noProduct.querySelector("h3").remove();
  noProduct.querySelector("h2.divider").textContent = "Sorry! Product not found.";

  noProduct.querySelector("img.divider").remove();

  noProduct.querySelector(".product-card__price").remove();
  noProduct.querySelector(".product__color").remove();
  noProduct.querySelector(".product__description").textContent = errorMessage;

  noProduct.querySelector("#addToCart").innerHTML = "<a href=\"/index.html\">Return to Home Page";

  document.querySelector("main").appendChild(noProduct);
}


export async function productDetails(productID) {
  try {
    let product = await findProductById(productID);
    if (product == undefined) throw new Error(`Not a valid product ID: "${productID}"`);
    await renderProductDetails(product);
    document.getElementById("addToCart").addEventListener("click", addToCartHandler);
  } catch (err) {
    console.log(err);
    renderErrorPage();
  }
}
