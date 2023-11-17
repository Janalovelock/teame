import { setLocalStorage, updateCartCount, getLocalStorage } from "./utils.mjs";
import { findProductById, getProductsByCategory } from "./externalServices.mjs";
//This file is responsible for rendering product details. It defines functions for adding products to the cart, calculating discount percentages, and rendering product details. It also exports a productDetails function for rendering product details on the product details page.

const baseURL = import.meta.env.VITE_SERVER_URL


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

  // Declare imgContainer to append images (primary or carousel)
  let imgContainer = newProduct.querySelector(".divider");

  // Check if ExtraImages exist
  if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
    // If ExtraImages exist, create a carousel
    let carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel");

    // Create a container for the large image
    let largeImageContainer = document.createElement("div");
    largeImageContainer.classList.add("large-image-container");

    // Create the large image element
    let largeImage = document.createElement("img");
    largeImage.src = product.Images.ExtraImages[0].Src; // Use the first image as the default large image
    largeImage.alt = product.Images.ExtraImages[0].Title;
    largeImageContainer.appendChild(largeImage);

    // Append the large image container to the image container
    imgContainer.appendChild(largeImageContainer);
    
   // Iterate through ExtraImages and create image elements
   product.Images.ExtraImages.forEach(extraImage => {
    let carouselImg = document.createElement("img");
    carouselImg.src = extraImage.Src;
    carouselImg.alt = extraImage.Title;
    
    // Add a click event listener to each small image in the carousel
    carouselImg.addEventListener("click", () => {
      // Update the large image when a small image is clicked
      largeImage.src = extraImage.Src;
      largeImage.alt = extraImage.Title;
    });

    carouselContainer.appendChild(carouselImg);
  });

  // Append the carousel to the image container
  imgContainer.appendChild(carouselContainer);
} else {
  // If no ExtraImages, use the primary image
  let img = document.createElement("img");
  img.srcset = `${product.Images.PrimaryLarge} 400w,
              ${product.Images.PrimaryExtraLarge} 500w`
  img.sizes = `(max-width: 400px), (min-width: 401px)`
  img.src = product.Images.PrimaryLarge;
  img.alt = product.NameWithoutBrand;

  // Append the primary image to the image container
  imgContainer.appendChild(img);
}

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


export async function productDetails(productID, productCategory) {
  try {
    let product = await findProductById(productID, productCategory);

    if (product == undefined) throw new Error(`Not a valid product ID: "${productID}"`);

    await renderProductDetails(product, productCategory, product.NameWithoutBrand);
    document.getElementById('addToCart').addEventListener('click', addToCartHandler);

     // Render recommended products
     await renderRandomRecommendedProduct();

  } catch (err) {
    console.log(err);
    renderErrorPage();
  }
}

async function renderRandomRecommendedProduct() {
  try {
    // Define the list of possible categories
    const allCategories = ['sleeping-bags', 'tents', 'hammocks', 'backpacks'];

    // Shuffle the categories to get a random order
    const shuffledCategories = shuffleArray(allCategories);

    // Create a container for the recommended products
    const recommendedContainerTitle = document.createElement('div');
    recommendedContainerTitle.classList.add('recommended-container-title');

    // Add a title to the container
    const title = document.createElement('h2');
    title.textContent = 'Recommended for you:';
    recommendedContainerTitle.appendChild(title);

    // Append the title container to the main container
    document.querySelector('main').appendChild(recommendedContainerTitle);

    // Create a container for the recommended products
    const recommendedContainer = document.createElement('div');
    recommendedContainer.classList.add('recommended-container');

    // Fetch three random products and create smaller images for each
    for (let i = 0; i < 3; i++) {
      // Select a random category
      const randomCategory = shuffledCategories[Math.floor(Math.random() * shuffledCategories.length)];

      // Fetch products for the random category
      const response = await fetch(baseURL + `/products/search/${randomCategory}`);
      const data = await response.json();
      const productsInCategory = data.Result;

      // Select a random product from the fetched list
      const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];

      // Create a container for each recommended product
      const productContainer = document.createElement('div');
      productContainer.classList.add('recommended-product');

      // Create an image element for the random product
      const productImage = document.createElement('img');
      productImage.src = randomProduct.Images.PrimaryLarge; // Adjust based on your data structure
      productImage.alt = randomProduct.NameWithoutBrand;

      // Add a click event listener to the image
      productImage.addEventListener('click', () => {
        // Redirect to the product details page when the image is clicked
        window.location.href = `/product-pages/index.html?product=${randomProduct.Id}`;
      });

      // Create a link for each recommended product
      const productLink = document.createElement('a');
      productLink.href = `/product-pages/index.html?product=${randomProduct.Id}`;
      productLink.textContent = '';

      // Append the image and link to the product container
      productContainer.appendChild(productImage);
      productContainer.appendChild(productLink);

      // Append the product container to the recommended container
      recommendedContainer.appendChild(productContainer);
    }

    // Append the recommended container to the main container
    document.querySelector('main').appendChild(recommendedContainer);
  } catch (err) {
    console.log(err);
    // Handle errors if necessary
  }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


