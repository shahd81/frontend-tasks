import axios from "axios";

const cache = {};
const pendingRequests = {};

export async function getProducts(limit, skip, requiresAuth = true) {
  const key = `products-${limit}-${skip}-${requiresAuth}`;

  if (cache[key]) {
    return cache[key];
  }

  if (pendingRequests[key]) {
    return pendingRequests[key];
  }

  const request = axios
    .get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}${
        requiresAuth ? "&checkAuth=true" : ""
      }`
    )
    .then((res) => {
      cache[key] = res.data;
      delete pendingRequests[key];
      return res.data;
    })
    .catch((error) => {
      delete pendingRequests[key];
      throw error;
    });

  pendingRequests[key] = request;

  return request;
}