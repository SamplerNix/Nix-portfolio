import { useEffect, useState } from "react"
import styles from "./ManageTech.module.css"
import AddTech from "./AddTech"

function ManageTech(){

 const [tech,setTech] = useState([])

 useEffect(()=>{

  fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/techstack`)
  .then(res=>res.json())
  .then(data=>setTech(data))

 },[])

 const deleteTech = async(id)=>{

  await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/delete-tech/${id}`,{
    method:"DELETE"
  })

  setTech(tech.filter(t=>t.id!==id))

 }

 return(

  <div className={styles.container}>

   <h2 className={styles.title}>
    Manage Tech Stack
   </h2>

   <AddTech/>

   <div className={styles.techGrid}>

   {tech.map(t=>(

    <div key={t.id} className={styles.techCard}>

      <img
       className={styles.techIcon}
       src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/uploads/tech/${t.icon}`}
       alt={t.name}
      />

      <h4 className={styles.techName}>
        {t.name}
      </h4>

      <button
       className={styles.deleteBtn}
       onClick={()=>deleteTech(t.id)}
      >
       Delete
      </button>

    </div>

   ))}

   </div>

  </div>

 )

}

export default ManageTech   