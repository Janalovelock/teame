import { getLocalStorage, qs, setLocalStorage } from './utils.mjs';

const checkoutProcess = {
  key: "so-cart",
  outputSelector: "#orderSummary",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function () {
    try {
      this.list = getLocalStorage(this.key) || [];
      this.calculateItemSummary();
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
    }
  },
  calculateItemSummary: function () {
    try {
      this.itemTotal = this.list.reduce((total, item) => {
        return total + (item.FinalPrice * item.Quantity);
      }, 0);
      this.calculateOrdertotal();
    } catch (error) {
      console.error('Error calculating item summary:', error);
    }
  },
  calculateOrdertotal: function () {
    try {
      const numberOfItems = this.list.reduce((total, item) => total + item.Quantity, 0);
      this.shipping = numberOfItems > 1 ? 10 + (numberOfItems - 1) * 2 : 10;
      this.tax = 0.06 * this.itemTotal;
      this.orderTotal = this.itemTotal + this.shipping + this.tax;
      this.displayOrderTotals();
    } catch (error) {
      console.error('Error calculating order total:', error);
    }
  },
  displayOrderTotals: function () {
    const outputElement = qs(this.outputSelector);
    outputElement.innerHTML = `

      <p>Item Subtotal: $${this.itemTotal.toFixed(2)}</p>
      <p>Shipping Cost: $${this.shipping.toFixed(2)}</p>
      <p>Tax: $${this.tax.toFixed(2)}</p>
      <p>Total: $${this.orderTotal.toFixed(2)}</p>
    `;
  },
};

// Call the init method when the page loads
document.addEventListener('DOMContentLoaded', () => {
  checkoutProcess.init();
});
