//This is responsible for handling the product list page. It imports functions and data from other files, loads a list of products, and updates the page based on user interactions.

import productList from "../js/productList.mjs";
import { loadHeaderFooter, getParam, renderList} from "../js/utils.mjs";
import { loadAlerts } from "../js/alertModule.js";
import { getProductsByCategory } from "../js/externalServices.mjs"; // Import the getProductsByCategory function
import { productCardTemplate } from "../js/productList.mjs"; // Update the path as per your file structure


const container = document.querySelector(".product-list");
const categoryBreadcrumb = document.getElementById("categoryBreadcrumb");

let category = getParam("category");
let prettyCategory = category[0].toUpperCase() + category.slice(1);

document.getElementById('categoryBreadcrumb').textContent = prettyCategory;
document.querySelector("title").textContent += prettyCategory;
document.querySelector(".products h2").textContent += `: ${prettyCategory}`;

loadAlerts();
loadHeaderFooter();
productList(container, category, 4);

// Function to handle the sorting logic
const handleSorterChange = () => {
    const sorter = document.getElementById('sorter');
  
    sorter.addEventListener('change', async function () {
      const selectedValue = sorter.value;
      const sortedData = await getProductsByCategory(category); // Call the function to get the sorted data
  
      if (selectedValue === 'name-asc') {
        sortedData.sort((a, b) => (a.Name > b.Name ? 1 : -1));
      } else if (selectedValue === 'name-desc') {
        sortedData.sort((a, b) => (a.Name < b.Name ? 1 : -1));
      } else if (selectedValue === 'price-asc') {
        sortedData.sort((a, b) => a.ListPrice - b.ListPrice);
      } else if (selectedValue === 'price-desc') {
        sortedData.sort((a, b) => b.ListPrice - a.ListPrice);
      }
  
      // Render the sorted list
      renderList(productCardTemplate, container, sortedData);
    });
  };
  handleSorterChange();