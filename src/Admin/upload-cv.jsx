import { useState } from "react";
import style from './Admin.module.css'

function UploadCV(){

  const [file,setFile] = useState(null)

  const handleUpload = async () => {

  if(!file){
    alert("Please select a file first")
    return
  }

  const formData = new FormData()
  formData.append("cv", file)

  try{

    const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/upload-cv`,{
      method:"POST",
      body:formData
    })

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || "Upload failed");
      }
      alert(data.message || "CV uploaded successfully!");
    } else {
      const errorText = await response.text();
      throw new Error(`Server returned HTTP ${response.status}: ${errorText.slice(0, 100)}`);
    }

  }catch(error){
    console.error(error);
    alert(`Upload failed: ${error.message}`);
  }

}
  return(

    <div className={style.contan}>

      <h2>Upload New CV</h2>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>

    </div>

  )

}
export default UploadCV