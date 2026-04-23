import api from "./api";

const cache = new Map();
const TTL = 2 * 60 * 1000; 

export async function getUsers() {
  const key = "/users";
  const cached = cache.get(key);

  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }
  try {
    const res = await api.get("/users");
    cache.set(key, {
      data: res.data,
      expires: Date.now() + TTL,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
}

export function invalidateUsersCache() {
  cache.delete("/users");
}