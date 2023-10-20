const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
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
