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

    const response = await fetch("http://localhost:5000/upload-cv",{
      method:"POST",
      body:formData
    })

    const data = await response.json()

    alert(data.message)

  }catch(error){
    console.log(error)
    alert("Upload failed")
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