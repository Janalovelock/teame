const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw {name: 'servicesError', message: res.json()};
  }
}

export function getProductsByCategory(category = "tents") {
  return fetch(baseURL + `/products/search/${category}`)
    .then(response => convertToJson(response))
    .then((data) => data.Result);
}

export async function findProductById(id) {
  const product = await fetch(baseURL + `/product/${id}`)
  .then(response => convertToJson(response))
  .then((data) => data.Result);
  return product;
}

export async function checkout(payload){
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }
  return await fetch(baseURL + '/checkout', options).then(convertToJson);
}