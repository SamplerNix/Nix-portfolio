import { useState } from "react"
import styles from "./ManageTech.module.css"
import { API_URL } from "../config"

function AddTech(){

 const [name,setName] = useState("")
 const [icon,setIcon] = useState(null)

 const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (icon) {
      formData.append("icon", icon);
    }

    try {
      const res = await fetch(`${API_URL}/add-tech`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add tech");
      }
      alert(data.message || "Tech Added");
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

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