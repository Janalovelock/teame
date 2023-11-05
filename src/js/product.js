import { getParam, loadHeaderFooter } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs";
import { getProductsByCategory, findProductById } from "./externalServices.mjs"; // Import your functions

loadHeaderFooter();

const productId = getParam("product");

async function getCategoryAndProductName() {
  try {
    // First, fetch the product's category using getProductsByCategory
    const productCategory = await getProductsByCategory(productId);

    // Then, fetch the product's name using findProductById
    const product = await findProductById(productId);

    // Extract the category and product name
    const category = product.Category;
    const productName = product.NameWithoutBrand;

    // Fetch the number of items in the category
    const categoryProducts = await getProductsByCategory(category);

    // Update the breadcrumb links with the correct category and product names
    document.getElementById('categoryBreadcrumb').textContent = category + ` (${categoryProducts.length} items)`;
    document.getElementById('productBreadcrumb').textContent = productName;

    // Get the element by its ID
    const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');

    // Update the href attribute
    categoryBreadcrumb.href = `/product-list/?category=${category}`;

    // Continue with rendering the product details
    productDetails(productId);
  } catch (error) {
    console.error(error);
  }
}

getCategoryAndProductName();
