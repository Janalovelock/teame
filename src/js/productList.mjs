import { getProductsByCategory } from "./externalServices.mjs";
import { renderList } from "./utils.mjs";
//This file defines a function productList that is responsible for rendering a list of products. It imports the getProductsByCategory function from an external service, defines a product card template, and exports the productList function.

function searchList(container){
    let i = 0;
    const items = container.querySelectorAll('.product-card')
    let elements = Array();
    for(let i=0; i< items.length; i++){
        const product = items[i]
        const brand = product.querySelector('.card__brand').textContent.toLowerCase()
        const name = product.querySelector('.card__name').textContent.toLowerCase()
        elements.push({element: product, brand:brand , name:name});
    }
    const searchBar = document.querySelector('.search-products input');
    searchBar.addEventListener('input', (e)=>{
        const search = e.target.value.toLowerCase();
        elements.forEach(product => {
            if(product.brand.includes(search) || product.name.includes(search)){
                product.element.classList.toggle('hide', false);
            }
            else product.element.classList.toggle('hide', true);
        })
    })
}

export default async function productList(selector, category, limit = 4) {
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
    console.log("Items:", items.length);
    renderList(productCardTemplate, selector, items);
    searchList(selector);
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
