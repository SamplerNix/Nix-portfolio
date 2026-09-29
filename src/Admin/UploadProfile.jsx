import { useState } from "react";
import { API_URL } from "../config";

function UploadProfile() {

  const [image,setImage] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/upload-profile`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      alert(data.message || "Profile photo updated successfully!");
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

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