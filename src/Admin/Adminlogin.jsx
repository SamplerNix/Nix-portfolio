import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './Admin.module.css';
import { API_URL } from "../config";

function Adminlogin(){

 const [password,setPassword] = useState("")
 const navigate = useNavigate()

const handleLogin = async (e) => {

    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if(data.success){
          localStorage.setItem("adminAuth","true");
          navigate("/admin/dashboard");
        } else {
          alert("Wrong password");
        }
      } else {
        alert(`Login failed (HTTP ${res.status}). Please check backend status and VITE_API_URL.`);
      }
    } catch (err) {
      console.error(err);
      alert("Unable to reach backend server. Please check VITE_API_URL setting.");
    }

  };

 return(

  <form className={style.contan} onSubmit={handleLogin}>

   <h2>Admin Login</h2>

   <input
    type="password"
    placeholder="Enter Password"
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button type="submit">
    Login
   </button>

  </form>

 )

}

export default Adminlogin