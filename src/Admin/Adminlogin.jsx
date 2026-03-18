import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './Admin.module.css'
function Adminlogin(){

 const [password,setPassword] = useState("")
 const navigate = useNavigate()

 const handleLogin = (e) => {

  e.preventDefault()

  const correctPassword = "admin123"; // change this

  if(password === correctPassword){

   localStorage.setItem("adminAuth","true")

   navigate("/admin/dashboard")

  }else{

   alert("Wrong password")

  }

 }

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