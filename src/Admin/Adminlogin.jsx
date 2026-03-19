import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './Admin.module.css'
function Adminlogin(){

 const [password,setPassword] = useState("")
 const navigate = useNavigate()

const handleLogin = async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:5000/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if(data.success){
      localStorage.setItem("adminAuth","true");
      navigate("/admin/dashboard");
    } else {
      alert("Wrong password");
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