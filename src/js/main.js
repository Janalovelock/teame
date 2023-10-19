import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { loadAlerts } from "./alertModule.js";

const container = document.querySelector(".product-list");

loadAlerts();
loadHeaderFooter();
productList(container, "tents", 4);
