import { getParam } from "./utils.mjs"
import { productDetails, addToCartHandler} from "./productDetails.mjs"

const productId = getParam("product");
productDetails(productId)


// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
