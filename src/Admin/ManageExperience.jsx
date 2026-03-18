import { useEffect, useState } from "react";
import AddExperience from "./AddExperience";
import style from "./ManageExperience.module.css";
function ManageExperience(){

 const [experiences,setExperiences] = useState([]);
 const [editingExperience,setEditingExperience] = useState(null);

 const [title,setTitle] = useState("");
 const [organisation,setOrganisation] = useState("");
 const [location,setLocation] = useState("");
 const [date,setDate] = useState("");
 const [type,setType] = useState("");

 useEffect(()=>{

  fetch("http://localhost:5000/experience")
  .then(res=>res.json())
  .then(data=>setExperiences(data));

 },[])


 const deleteExperience = async(id)=>{

  await fetch(`http://localhost:5000/delete-experience/${id}`,{
   method:"DELETE"
  });

  setExperiences(
   experiences.filter(e=>e.id!==id)
  );

 };


 const startEdit = (exp)=>{

  setEditingExperience(exp.id);

  setTitle(exp.title);
  setOrganisation(exp.organisation);
  setLocation(exp.location);
  setDate(exp.date);
  setType(exp.type);

 };


 const updateExperience = async(e)=>{

  e.preventDefault();

  await fetch(`http://localhost:5000/update-experience/${editingExperience}`,{
   method:"PUT",
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
  });

  const updated = experiences.map(exp => {

   if(exp.id === editingExperience){
    return { ...exp, title, organisation, location, date, type }
   }

   return exp;

  });

  setExperiences(updated);
  setEditingExperience(null);

 };


return(

<div className={style.container}>

<h2 className={style.heading}>Manage Experience</h2>

<AddExperience/>

<hr/>

{editingExperience && (

<form onSubmit={updateExperience}>

<h3>Edit Experience</h3>

<input
 value={title}
 onChange={(e)=>setTitle(e.target.value)}
 placeholder="Title"
/>

<input
 value={organisation}
 onChange={(e)=>setOrganisation(e.target.value)}
 placeholder="Organisation"
/>

<input
 value={location}
 onChange={(e)=>setLocation(e.target.value)}
 placeholder="Location"
/>

<input
 value={date}
 onChange={(e)=>setDate(e.target.value)}
 placeholder="Date"
/>

<input
 value={type}
 onChange={(e)=>setType(e.target.value)}
 placeholder="Type"
/>

<button type="submit">
 Update Experience
</button>

</form>

)}

<div className={style.list}>

{experiences.map(exp=>(

<div key={exp.id} className={style.card}>

<div className={style.title}>
 {exp.title}
</div>

<p className={style.info}>{exp.organisation}</p>
<p className={style.info}>{exp.location}</p>
<p className={style.info}>{exp.date}</p>
<p className={style.info}>{exp.type}</p>

<div className={style.buttonGroup}>

<button
 className={style.editBtn}
 onClick={()=>startEdit(exp)}
>
 Edit
</button>

<button
 className={style.deleteBtn}
 onClick={()=>deleteExperience(exp.id)}
>
 Delete
</button>

</div>

</div>

))}

</div>

</div>

)

}

export default ManageExperience