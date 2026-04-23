import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/posts.service";
// import { getUsers } from "../services/user.service";
import { getUsers } from "../services/UserTest";
import {getProducts}from "../services/product.service"
import { useContext, useEffect } from "react";
import { setAccessToken } from "../services/tokenStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function TestComponent() {
const {accessToken}=useContext(AuthContext);
const navigate = useNavigate();

  useEffect(() => {
  if (accessToken) {
    setAccessToken(accessToken);
  }else{
    setAccessToken("expired_token");
  }
}, [accessToken]);

//  useEffect(()=>{
//   setAccessToken("expired_token");

//  },[])
  const fetchData = async () => {
  try {
    const res1 = await getUsers();
    console.log("Success 1:", res1.data);
    
    const res2 = await getPosts();
    console.log("Success 2:", res2.data);
    
    const res3 = await getProducts(10, 0); 
    console.log("Success 3:", res3.data);
       const res12 = await getUsers();
           console.log("Success 12:", res12.data);
           const res13 = await getUsers();
           console.log("Success 13:", res13.data);
           const res14 = await getUsers();
           console.log("Success 14:", res14.data);
       const res15 = await getUsers();
           console.log("Success 12:", res15.data);
           const res16 = await getUsers();
           console.log("Success 13:", res16.data);
           const res17 = await getUsers();
           console.log("Success 14:", res17.data);

  } catch (err) {
    console.error("API failed or logout triggered", err);
    toast.error("Please login first");
    navigate("/")
  }
};

  return (
    <div>
      <button onClick={fetchData}
      className="  bg-gray-300 text-black dark:text-white "
      >Fetch Test Data</button>
      <a className="text-black dark:text-white" onMouseEnter={getPosts}>Posts</a>
    </div>
  );
}