import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from './ChatBot';




const CranesPage = () => {
  /* const navigate = useNavigate();
   const token = localStorage.getItem("token"); // Replace 'authToken' with the key used in your app
   const decodedToken = jwtDecode(token); // Decode the token
   const userid = decodedToken.userid;
   console.log(userid)
   useEffect(() => {
     checkAuth();
   }, []);
 
   const checkAuth = async () => {
     try {
       const token = localStorage.getItem('token');
       if (!token) {
         navigate('/signin');
         return;
       }
 
       const response = await fetch(`${import.meta.env.VITE_API_URL}CranesPage`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         }
       });
       const data = await response.json();
       console.log(data);
     }
     catch (error) {
       console.error("Error checking authentication:", error);
     }
   };
   */

  return (
    <div>CranesPage

      <ChatBot />
    </div>
  )
}

export default CranesPage