import { getLocalStorage, alertMessage, setLocalStorage } from "./utils.mjs";
import {checkout} from "./externalServices.mjs";

function formToJson(form){
    const data = new FormData(form);
    const jsonData = {};
    data.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log(jsonData);

    return jsonData;
}

function packageItems(items){
    const formattedItems = items.map(item => {
        return {id: item.Id, name: item.Name, price: item.ListPrice, quantity: item.Quantity}
    })
    return formattedItems;

}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
    calculateItemSummary: function() {
        const prices = this.list.map((item) => {
            return item.ListPrice;
        })
        const totalPrice = prices.reduce((total, current) => {
            return total += current;
        }, 0).toFixed(2)
        const items = this.outputSelector.querySelector('#subtotal');
        items.children[0].textContent = `(${prices.length})`
        items.children[1].textContent = `$${totalPrice}`;
        this.itemTotal = totalPrice;
        this.calculateOrderTotal();
    },
    calculateOrderTotal: function() {
        this.shipping = (10.00 + (this.list.length - 1)*2).toFixed(2);
        this.tax = (this.itemTotal * .06).toFixed(2);
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
        this.displayOrderTotals();
    },
    displayOrderTotals: function() {
        this.outputSelector.querySelector('#shipping .price').textContent = `$${this.shipping}`;
        this.outputSelector.querySelector('#tax .price').textContent = `$${this.tax}`;
        this.outputSelector.querySelector('#orderTotal .price').textContent = `$${this.orderTotal}`;
    },
    checkout: async function (form) {
        const object = formToJson(form);
        const date = new Date()
        object.orderDate = date;
        object.orderTotal = this.orderTotal;
        object.tax = this.tax;
        object.shipping = this.shipping;
        object.items = packageItems(this.list)
        try {
            const response = await checkout(object)
            console.log(response);
            this.clearCart(form);
            setLocalStorage('so-cart', []);
            location.assign("/checkout/success.html");
        } catch (err){
            console.log(err)
            for (let message in err.message) {
                console.log(message)
                console.log(err.message[message])
                alertMessage(err.message[message]);
            }
            console.log(err)
        }
    },
    clearCart: function (form){
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = "";
        })

    }
};

export default checkoutProcess;
