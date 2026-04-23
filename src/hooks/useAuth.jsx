import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTokenFromCookie } from "../services/auth.service";
export function useAuth() {
  const context = useContext(AuthContext);

  const token = getTokenFromCookie();
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }  
  return {...context,token};
}
