import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import styles from "./ManageProjects.module.css";

function ManageProjects() {

  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  // FETCH PROJECTS
  useEffect(() => {

    fetch("http://localhost:5000/projects")
      .then(res => res.json())
      .then(data => setProjects(data));

  }, []);

  // DELETE PROJECT
  const deleteProject = async (id) => {

    await fetch(`http://localhost:5000/delete-project/${id}`, {
      method: "DELETE"
    });

    setProjects(projects.filter(p => p.id !== id));

  };

  // START EDIT
  const startEdit = (project) => {
    setEditingProject(project);
  };

  // UPDATE PROJECT
  const updateProject = async () => {

    await fetch(`http://localhost:5000/update-project/${editingProject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editingProject)
    });

    alert("Project Updated");

    setProjects(
      projects.map(p =>
        p.id === editingProject.id ? editingProject : p
      )
    );

    setEditingProject(null);

  };

  return (

    <div className={styles.container}>

      <h2 className={styles.title}>Manage Projects</h2>

      {/* ADD PROJECT FORM */}
      <AddProject />

      <hr className={styles.divider} />

      {/* PROJECT LIST */}
      <div className={styles.projectList}>

        {projects.map(project => (

          <div key={project.id} className={styles.projectCard}>

            <h3 className={styles.projectTitle}>
              {project.title}
            </h3>

            <div className={styles.buttonGroup}>

              <button
                className={styles.editBtn}
                onClick={() => startEdit(project)}
              >
                Edit
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* EDIT FORM */}
      {editingProject && (

        <div className={styles.editForm}>

          <h3>Edit Project</h3>

          <input
            type="text"
            placeholder="Title"
            value={editingProject.title}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                title: e.target.value
              })
            }
          />

          <textarea
            placeholder="Description"
            value={editingProject.description}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                description: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Tech Stack"
            value={editingProject.tech}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                tech: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Live Link"
            value={editingProject.link}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                link: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Github Link"
            value={editingProject.gitlink}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                gitlink: e.target.value
              })
            }
          />

          <button
            className={styles.updateBtn}
            onClick={updateProject}
          >
            Update Project
          </button>

        </div>

      )}

    </div>

  );

}

export default ManageProjects;