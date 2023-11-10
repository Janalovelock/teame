import { ordersRequest } from "./externalServices.mjs";


// Function to display orders
async function displayOrders() {
  try {
    const orders = await ordersRequest();
    const ordersListElement = document.getElementById("ordersList");

  
    ordersListElement.innerHTML = '';


    orders.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.classList.add('order');
      orderElement.innerHTML = `
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Customer:</strong> ${order.fname} ${order.lname}</p>
      <p><strong>Order Date:</strong> ${order.orderDate}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items.map(item => `
          <li>
            <p><strong>Product Name:</strong> ${item.name}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Price per Item:</strong> $${item.price}</p>
            <p><strong>Subtotal:</strong> $${item.price * item.quantity}</p>
          </li>
        `).join('')}
      </ul>
      <p><strong>Total Amount:</strong> $${order.orderTotal}</p>
      <hr>
      `;
      ordersListElement.appendChild(orderElement);
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Handle the error appropriately, such as displaying an error message on the webpage.
  }
}

// Call the displayOrders function when the page loads
window.addEventListener('DOMContentLoaded', displayOrders);