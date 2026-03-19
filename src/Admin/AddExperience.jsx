import { useState } from "react";
import style from "./AddExperience.module.css";

function AddExperience(){

 const [title,setTitle] = useState("")
 const [organisation,setOrganisation] = useState("")
 const [location,setLocation] = useState("")
 const [date,setDate] = useState("")
 const [type,setType] = useState("")

 const handleSubmit = async(e)=>{
  e.preventDefault()

  await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/add-experience`,{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    title,
    organisation,
    location,
    date,
    type
   })
  })

  alert("Experience Added")
 }

 return(

  <div className={style.container}>

   <form className={style.form} onSubmit={handleSubmit}>

    <div className={style.title}>
     Add Experience
    </div>

    <input
     className={style.input}
     placeholder="Job Title"
     onChange={(e)=>setTitle(e.target.value)}
    />

    <input
     className={style.input}
     placeholder="Organisation"
     onChange={(e)=>setOrganisation(e.target.value)}
    />

    <input
     className={style.input}
     placeholder="Location"
     onChange={(e)=>setLocation(e.target.value)}
    />

    <input
     className={style.input}
     placeholder="Date"
     onChange={(e)=>setDate(e.target.value)}
    />

    <input
     className={style.input}
     placeholder="Type (Internship / Full Time)"
     onChange={(e)=>setType(e.target.value)}
    />

    <button className={style.button} type="submit">
      Add Experience
    </button>

   </form>

  </div>

 )

}

export default AddExperience