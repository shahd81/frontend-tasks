// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { Roles } from "../constants/roles";
// import { useNavigate } from "react-router-dom";
import {  logout as serviceLogout } from "../services/auth.service";
import { setAccessToken as setToken } from "../services/tokenStore";
export function AuthProvider({ children }) {
  // const navigate = useNavigate();
 
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(row => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };
  const [accessToken, setAccessToken] = useState(getTokenFromCookie());
  // const [expiresAt, setExpiresAt] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role") || Roles.User);

  // login
const handleLogin = (data) => {
  setAccessToken(data.accessToken);
  setToken(data.accessToken)
  console.log(accessToken);
  
  localStorage.setItem("refreshToken", data.refreshToken);
};
  
// const apiCall = async (url, options = {}) => {
//   const headers = {
//     ...options.headers,
//     ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//   };
//   let response = await fakeApi(url, { ...options, headers });
//    const data = await apiCall("/api/test");
//   if (response.status !== 401) return data;

//   return handle401({ url, options });
// };
//   const handle401 = ({ url, options }) => {
//     return new Promise((resolve, reject) => {
//       refreshQueue.push({ url, options, resolve, reject });

//       if (!refreshInProgress) {
//         refreshInProgress = true;
//         const oldRefreshToken = localStorage.getItem("refreshToken");

//         refreshTokenService(oldRefreshToken)
//           .then(data => {
//             setAccessToken(data.accessToken);
//             refreshInProgress = false;

//             const queue = [...refreshQueue];
//             refreshQueue = [];
//             queue.forEach(item => {
//               apiCall(item.url, item.options)
//                 .then(item.resolve)
//                 .catch(item.reject);
//             });
//           })
//           .catch(err => {
//             refreshInProgress = false;
//             refreshQueue.forEach(item => item.reject(err));
//             refreshQueue = [];
//             logout();
//           });
//       }
//     });
//   };

  // logout
  const logout = () => {
  serviceLogout();
};
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);
  
  return (
    <AuthContext.Provider value={{ accessToken, handleLogin, logout, role, setRole  }}>
      {children}
    </AuthContext.Provider>
  );
}
    export const AuthContext = createContext();