//This is responsible for handling the product list page. It imports functions and data from other files, loads a list of products, and updates the page based on user interactions.

import productList from "../js/productList.mjs";
import { loadHeaderFooter, getParam, renderList } from "../js/utils.mjs";
import { loadAlerts } from "../js/alertModule.js";
import { getProductsByCategory } from "../js/externalServices.mjs";
import { productCardTemplate } from "../js/productList.mjs";

const container = document.querySelector(".product-list");

let category = getParam("category");

loadAlerts();
loadHeaderFooter();

getProductsByCategory(category) // Fetch the products
  .then(data => {
    let prettyCategory = category[0].toUpperCase() + category.slice(1);

    // Update the breadcrumb links with the correct category and product names.
    document.getElementById('categoryBreadcrumb').textContent = prettyCategory + ` (${data.length} items)`;
    document.querySelector("title").textContent += prettyCategory;
    document.querySelector(".products h2").textContent += `: ${prettyCategory} (${data.length} items)`;

    // Call productList and render the products
    productList(container, category, 4);
  })
  .catch(error => {
    console.error(error);
    // Handle errors here
  });