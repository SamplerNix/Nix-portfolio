import { useState } from "react";
import styles from "./AddProject.module.css";

function AddProject() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [link, setLink] = useState("");
  const [gitlink, setGitlink] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("tech", tech);
    formData.append("link", link);
    formData.append("gitlink", gitlink);
    formData.append("image", image);

    await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/add-project`, {
      method: "POST",
      body: formData
    });

    alert("Project added successfully");

  };

  return (

    <div className={styles.container}>

      <h2 className={styles.title}>Add Project</h2>

      <form onSubmit={handleSubmit} className={styles.form}>

        <input
          className={styles.input}
          type="text"
          placeholder="Project Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Project Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Tech Stack (React, Node...)"
          onChange={(e) => setTech(e.target.value)}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Live Project Link"
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Github Link"
          onChange={(e) => setGitlink(e.target.value)}
        />

        <input
          className={styles.fileInput}
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className={styles.button} type="submit">
          Upload Project
        </button>

      </form>

    </div>

  );

}

export default AddProject;