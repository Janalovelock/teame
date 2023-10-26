import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const form = document.querySelector("form");

checkoutProcess.init("so-cart", document.querySelector("#order-summary"));

form
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrderTotal.bind(checkoutProcess)
  );

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.calculateItemSummary();
  checkoutProcess.checkout(e.target);
});

// {
//     orderDate: '2021-01-27T18:18:26.095Z',
//     fname: "John",
//     lname: "Doe",
//     street: "123 Main",
//     city: "Rexburg",
//     state: "ID",
//     zip: "83440",
//     cardNumber: "1234123412341234",
//     expiration: "8/21",
//     code: "123",
//     orderTotal: "298.18",
//     shipping: 12,
//     tax: "16.20"
//   }

// cardNumber: "1234123412341234"
// city: "STV"
// code: "123"
// expiration: "04/2024"
// fname: "Chad"
// lname: "Chaddington"
// orderDate: Date Thu Oct 26 2023 10:31:20 GMT-0700 (Mountain Standard Time)
// orderTotal: "333.96"
// shipping: "16.00"
// state: "AZ"
// street: "123 Bob's avenue"
// tax: "18.00"
// zip: "34500"
