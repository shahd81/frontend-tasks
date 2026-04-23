import api from "./api";

const cache = new Map();
const TTL = 9 * 60 * 1000; 

export async function getPosts() {
      const key = "/posts";
    const cached = cache.get(key);

  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }
    try {
        const res = await api.get("/posts");
        cache.set(key, {
      data: res.data,
      expires: Date.now() + TTL,
    });
    return res.data;
    } catch (error) {
        throw new Error (error)
    }
}
export async function deletePost(id) {
    try {
        const res = await api.delete(`/posts/${id}`);
        console.log(`the item${id} is deletd`)
        return res.data
    } catch (error) {
        throw new Error (error)
    }
}
export async function editPost(id) {
    try {
        const res = await api.put(`/posts/${id}`);
        console.log(`the item${id} is edited`)
        return res.data
    } catch (error) {
        throw new Error (error)
    }
}
export const checkOnlineStatus = async () => {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "HEAD",
      // cache: "no-cache",
    });
    return true;
  } catch {
    return false;
  }
};