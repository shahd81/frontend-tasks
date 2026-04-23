export function saveToken(token,expiresInMinute=1){
    const expiryTime = new Date().getTime()+expiresInMinute*60*1000;
    const tokenData = {token:token , expiry:expiryTime}
    localStorage.setItem("UserToken",JSON.stringify(tokenData));
}
export function getToken(){
   const tokenData= JSON.parse(localStorage.getItem("UserToken"))
   if (!tokenData)return null;
   if (new Date().getTime()>tokenData.expiry) {
    localStorage.removeItem("userToken");
    return null;
   }
   return tokenData.token;
}