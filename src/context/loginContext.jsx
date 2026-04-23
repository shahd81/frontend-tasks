// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { refreshToken, logout as authLogout } from "../services/auth.service";
import { Roles } from "../constants/roles";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
     const [role,setRole]=useState(
            localStorage.getItem("role") || Roles.User
        );
      useEffect(()=>{
         localStorage.setItem("role",role)
      },[role])
    
  const [accessToken, setAccessToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  // Load refresh token from localStorage on mount
  useEffect(() => {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) {
      handleRefresh(refresh);
    }
  }, []);

  // Check access token expiration
  useEffect(() => {
    if (!expiresAt) return;
    const now = Date.now();
    const timeout = expiresAt - now;
    if (timeout <= 0) {
      const refresh = localStorage.getItem("refreshToken");
      if (refresh) handleRefresh(refresh);
      else handleLogout();
    } else {
      const timer = setTimeout(() => {
        const refresh = localStorage.getItem("refreshToken");
        if (refresh) handleRefresh(refresh);
        else handleLogout();
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [expiresAt]);

  const handleLogin = ({ accessToken, refreshToken, expiresIn }) => {
    setAccessToken(accessToken);
    setExpiresAt(Date.now() + expiresIn);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const handleRefresh = async (refresh) => {
    try {
      const res = await refreshToken(refresh);
      setAccessToken(res.accessToken);
      setExpiresAt(Date.now() + res.expiresIn);
    } catch {
      handleLogout();
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    setExpiresAt(null);
    authLogout();
  };

  return (
    <AuthContext.Provider value={{ accessToken, handleLogin, handleLogout,role,setRole }}>
      {children}
    </AuthContext.Provider>
  );
}