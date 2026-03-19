import { useState } from "react";

function UploadProfile() {

  const [image,setImage] = useState(null)

  const handleUpload = async (e) => {

    e.preventDefault()

    const formData = new FormData()
    formData.append("image",image)

    await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/upload-profile`,{
      method:"POST",
      body:formData
    })

    alert("Profile photo updated")

  }

  return (

    <div>

      <h2>Upload Profile Photo</h2>

      <form onSubmit={handleUpload}>

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <button type="submit">
          Upload
        </button>

      </form>

    </div>

  )

}

export default UploadProfile