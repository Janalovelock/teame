import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const container = document.querySelector(".product-list");

loadHeaderFooter();
productList(container, "tents", 4);
