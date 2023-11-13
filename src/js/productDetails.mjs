import { setLocalStorage, updateCartCount, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
//This file is responsible for rendering product details. It defines functions for adding products to the cart, calculating discount percentages, and rendering product details. It also exports a productDetails function for rendering product details on the product details page.


function addProductToCart(product) {
  let storage = localStorage.getItem("so-cart") || '[]';
  const cartItems = JSON.parse(storage);

  const existingItem = cartItems.find(item => item.Id === product.Id);

  if (existingItem) {
    existingItem.Quantity += 1; // Increment the quantity if the item is already in the cart
  } else {
    // If the item is not in the cart, add it with an initial quantity of 1
    cartItems.push({...product, Quantity: 1});
  }

  localStorage.setItem("so-cart", JSON.stringify(cartItems));
}

// Calculate the discount percentage
function calculateDiscountPercentage(SuggestedRetailPrice, FinalPrice) {
  const discount = ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100;
  return discount.toFixed(2);
}

async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  updateCartCount();
}

export async function renderProductDetails(product) {
  const temp = document.querySelector("#product-temp");
  const newProduct = document.importNode(temp.content, true);

  newProduct.querySelector("h3").textContent = product.Brand.Name;
  newProduct.querySelector("h2.divider").textContent = product.NameWithoutBrand;

  let img = newProduct.querySelector("img.divider");
  img.srcset = `${product.Images.PrimaryLarge} 400w,
                ${product.Images.PrimaryExtraLarge} 500w`
  img.sizes = `(max-width: 400px), (min-width: 401px)`
  img.src = product.Images.PrimaryLarge;
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

  //? Create a card to contain the product detail's text in the modal.
  let modalCard = document.createElement("div");
  //? Target the modal.
  let modalText = document.querySelector(".product-modal-content");

  //? Create p elements to append to the modalCard. 
  let productName = document.createElement("p");
  let brandName = document.createElement("p");
  let suggestedSalePrice = document.createElement("p");
  let disc = document.createElement("p");
  let finalPrice = document.createElement("p");
  let description = document.createElement("p");

  //? Set values of text to the elements.
  productName.textContent = `Product Name: ${product.Brand.Name}`;
  brandName.textContent = ` Brand Name: ${product.NameWithoutBrand}`;
  suggestedSalePrice.textContent = `Suggested Retail Price: $${product.SuggestedRetailPrice}`;
  disc.textContent = `Product Discount: $${calculateDiscountPercentage(product.SuggestedRetailPrice, product.FinalPrice)}`;
  finalPrice.textContent = `Product Final Price: $${product.FinalPrice}`;
  description.innerHTML = `Product Description: ${product.DescriptionHtmlSimple}`;
  
  //? Append all the elements to the card.
  modalCard.append(productName);
  modalCard.append(brandName);
  modalCard.append(suggestedSalePrice);
  modalCard.append(disc);
  modalCard.append(finalPrice);
  modalCard.append(description);

  //? Append the card to the modal
  modalText.append(modalCard);
  console.log(modalText);
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


export async function productDetails(productID, productCategory) {
  try {
    let product = await findProductById(productID, productCategory);
    console.log(product)
    if (product == undefined) throw new Error(`Not a valid product ID: "${productID}"`);
    await renderProductDetails(product, productCategory, product.NameWithoutBrand);
    document.getElementById("addToCart").addEventListener("click", addToCartHandler);
  } catch (err) {
    console.log(err);
    renderErrorPage();
  }
}
