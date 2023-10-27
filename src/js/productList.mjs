//This file defines a function productList that is responsible for rendering a list of products. It imports the getProductsByCategory function from an external service, defines a product card template, and exports the productList function.

import { getProductsByCategory } from "./externalServices.mjs";
import { renderList } from "./utils.mjs";

export default async function productList(selector, category, limit) {
    const data = await getProductsByCategory(category);
    console.log("Data:", data);
    let items = [];
    const path = window.location.pathname;

    const isMainPage = path === '/index.html' || path === '/';


    for (let i = 0; i < data.length; i++) {
        const imageBool = await fetch(data[i].Image).then(res => res.ok).catch(err => false);
        // Limit the number of items only if it's the home page
        if (imageBool && (isMainPage ? items.length < 4 : true)) {
            items.push(data[i]);
        }
    }
    console.log("Items:", items);
    renderList(productCardTemplate, selector, items);
}

function productCardTemplate(product) {
    const suggestedRetailPrice = product.SuggestedRetailPrice || 0;
    const listPrice = product.ListPrice || 0;
    
    // Calculate the discount percentage
    const discountPercentage = ((suggestedRetailPrice - listPrice) / suggestedRetailPrice) * 100;

    return `<li class="product-card">
            <a href="/product-pages/index.html?product=${product.Id}">
            <img
                srcset="${product.Images.PrimarySmall} 300w,
                        ${product.Images.PrimaryMedium} 500w,
                        ${product.Images.PrimaryLarge} 501w"
                sizes="(max-width: 300px), (max-width: 500px), (min-width: 501px)"
                alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">
            $${listPrice.toFixed(2)}  
            <span class="discount-percentage">
            (${discountPercentage.toFixed(0)}% off)</span>
        </p></a>
        </li>`;
}
export { productList, productCardTemplate };
