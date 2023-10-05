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

export function renderList(templateFn, parentElement, list, position = 'afterbegin', clear = true){
  if(clear){
    if(parentElement.children > 0)
      parentElement.children.forEach((child) => {child.remove();});
  }
  const htmlStrings =  list.map((item) => templateFn(item));
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));;
}