import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";
loadHeaderFooter();

let redirect = getParam("redirect");

const __loginForm = document.querySelector(".login-form");
__loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target[1].value.trim();
  const password = e.target[2].value.trim();
  const credentials = { email: email, password: password };
  login(credentials);
});
