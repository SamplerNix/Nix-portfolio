import { useState } from "react"
import styles from "./ManageTech.module.css"

function AddTech(){

 const [name,setName] = useState("")
 const [icon,setIcon] = useState(null)

 const handleSubmit = async(e)=>{
  e.preventDefault()

  const formData = new FormData()

  formData.append("name",name)
  formData.append("icon",icon)

  await fetch("http://localhost:5000/add-tech",{
   method:"POST",
   body:formData
  })

  alert("Tech Added")
 }

 return(

  <form
   className={styles.form}
   onSubmit={handleSubmit}
  >

   <input
    className={styles.input}
    type="text"
    placeholder="Tech Name"
    onChange={(e)=>setName(e.target.value)}
   />

   <input
    className={styles.fileInput}
    type="file"
    onChange={(e)=>setIcon(e.target.files[0])}
   />

   <button
    className={styles.addBtn}
    type="submit"
   >
    Add Tech
   </button>
  </form>

 )

}

export default AddTech