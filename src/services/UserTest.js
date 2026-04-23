import api from "./api";
export async function getUsers() {
  try {
    const res = await api.get("/users");
  
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
}