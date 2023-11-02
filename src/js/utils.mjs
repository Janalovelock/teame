// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param = "product"){
  const url = new URL(window.location.href);
  const parameter = url.searchParams.get(param);
  return parameter;
}

export function renderList(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    // Convert HTMLCollection to array
    Array.from(parentElement.children).forEach((child) => {
      child.remove();
    });
  }
  const htmlStrings =  list.map((item) => templateFn(item));
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));;
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
  if (clear) {
      parentElement.innerHTML = "";
  }
  const html = await templateFn(data);
  parentElement.insertAdjacentHTML(position, html);
  if(callback) {
      callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const header = document.querySelector("header")
  const footer = document.querySelector("footer")
  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);
}


export function updateCartCount() {
  const selectInterval = setInterval(() => {
    const cartCountElement = document.querySelector(".cart-count");
    const cartIcon = document.querySelector(".cart #svg"); // Get the cart icon

    // Retrieve cart data from local storage
    const cartItems = getLocalStorage("so-cart");
    if (cartCountElement) {
      if (cartItems && cartItems.length > 0) {
        // Calculate the total quantity of items in the cart
        let totalQuantity = 0;
        cartItems.forEach((item) => {
          totalQuantity += item.Quantity;
        });

        // Update the cart count element with the total quantity
        cartCountElement.style.display = "inline-block";
        cartCountElement.textContent = totalQuantity;
      } else {
        // Hide the cart count element when the cart is empty
        cartCountElement.style.display = "none";
      }
      clearInterval(selectInterval);
    }
  }, 25);
}

export function alertMessage(message, scroll=true){
  const alert = document.createElement('div');
  alert.classList.add('alert');

  alert.innerHTML = `<p>${message}</p><span>X</span>`

  alert.addEventListener('click', function(e){
    if(e.target.tagName == 'SPAN'){
      main.removeChild(this);
    }
  })

  const main = document.querySelector('main');
  main.prepend(alert)
  if(scroll){
    window.scrollTo(0,0);
  }
}