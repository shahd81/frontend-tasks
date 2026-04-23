
const saveTokenToCookie = (token, expiresIn) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expiresIn);

  document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};


const removeTokenCookie = () => {
  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

export function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const data = {
          accessToken: "fake-access-token",
          refreshToken: "fake-refresh-token",
          expiresIn: 20*60*10000,
        };
        //  console.log("8655553",document.cookie);
        saveTokenToCookie(data.accessToken, data.expiresIn);

        localStorage.setItem("refreshToken", data.refreshToken);

        resolve(data);
      } else {
        reject("Invalid credentials");
      }
    }, 1000);
  });
}
 export function getTokenFromCookie() {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  return match ? match[2] : null;
}
export function refreshToken(oldRefreshToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (oldRefreshToken === "fake-refresh-token") {
        const data = {
          accessToken: "new-fake-access-token",
          expiresIn:5*10000,
        };

        saveTokenToCookie(data.accessToken, data.expiresIn);

        resolve(data);
      } else {
        reject("Refresh token invalid");
      }
    }, 1000);
  });
}
// export const refreshToken = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const success = Math.random() > 0.3; 

//       if (success) {
//         resolve({
//           accessToken: "new-token-" + Date.now(),
//         });
//       } else {
//         reject(new Error("Refresh failed"));
//       }
//     }, 1500);
//   });
// };
export function logout() {
  removeTokenCookie();
  removeRefreshToken();
  window.location.href = "/";
}