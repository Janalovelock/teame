import { getData } from "./productData.mjs";
import { renderList } from "./utils.mjs";

export default async function productList(selector, category, limit){
    const data = await getData(category)
    let items = []
    for(let i = 0; i < data.length; i++){
        const imageBool = await fetch(data[i].Image).then(res => (res.ok)).catch(err => (false));
        if(imageBool && items.length < limit)
            items.push(data[i])
    }
    renderList(productCardTemplate, selector, items)
}

function productCardTemplate(product) {
    const suggestedRetailPrice = product.SuggestedRetailPrice || 0;
    const listPrice = product.ListPrice || 0;
    
    // Calculate the discount percentage
    const discountPercentage = ((suggestedRetailPrice - listPrice) / suggestedRetailPrice) * 100;

    return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
            <img
                src="${product.Image}"
                alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">
            $${listPrice.toFixed(2)}  
            <span class="discount-percentage">
            (${discountPercentage.toFixed(0)}% off)</span>
        </p></a>
        </li>`
}


