import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { loadAlerts } from "./alertModule.js";
import "./welcomeBanner.js";

const container = document.querySelector(".product-list");

loadAlerts();
loadHeaderFooter();
productList(container, "tents");
