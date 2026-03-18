import { Link } from "react-router-dom";
import style from "./Admin.module.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();

const logout = () => {

 localStorage.removeItem("adminAuth");

 navigate("/admin");

};
  return (
    <div className={style.contan}>
      <h1>Admin Dashboard</h1>

      <ul>
        <li>
          <Link className={style.link} to="/admin/upload-cv">
            Upload CV
          </Link>
        </li>

        <li>
          <Link className={style.link} to="/admin/ManageProjects">
            {" "}
            Manage Projects
          </Link>
        </li>

        <li>
          <Link className={style.link} to="/admin/manage-tech">
            Manage Tech Stack
          </Link>
        </li>

        <li>
          <Link className={style.link} to="/admin/upload-profile">
            Change Profile Photo
          </Link>
        </li>
           <li>
          <Link className={style.link} to="/admin/manage-experience">
            Manage Experience
          </Link>
        </li>
      </ul>
      <button onClick={logout}>
 Logout
</button>
    </div>
  );
}

export default Dashboard;
