import productList from "../js/productList.mjs";
import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import { loadAlerts } from "../js/alertModule.js";

const container = document.querySelector(".product-list");

let category = getParam("category");
let prettyCategory = category[0].toUpperCase() + category.slice(1);
document.querySelector("title").textContent += prettyCategory;
document.querySelector(".products h2").textContent += `: ${prettyCategory}`;

loadAlerts();
loadHeaderFooter();
productList(container, category, 4);
