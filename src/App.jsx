import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Techstack from "./components/Techstack/Techstack";
import Projects from "./components/Projects/Projects";
import AboutMe from "./components/AboutMe/AboutMe";
import Contactform from "./components/Contactform/Contactform";
import { Routes, Route } from "react-router-dom";
import Adminlogin from "./Admin/Adminlogin";
import Dashboard from "./Admin/dashboard";
import UploadCV from "./Admin/upload-cv";
import AddProject from "./Admin/AddProject";
import ManageProjects from "./Admin/ManageProjects";
import ManageTech from "./Admin/ManageTech";
import UploadProfile from "./Admin/UploadProfile";
import ManageExperience from "./Admin/ManageExperience";
import ProtectedRoute from "./Admin/ProtectedRoute";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Techstack />
              <Projects />
              {/* AdminPanel */}
            </>
          }
        />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="/Contactform" element={<Contactform />} />
        <Route path="/Admin" element={<Adminlogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/upload-cv"
          element={
            <ProtectedRoute>
              <UploadCV />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/AddProject"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manageprojects"
          element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-tech"
          element={
            <ProtectedRoute>
              <ManageTech />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload-profile"
          element={
            <ProtectedRoute>
              <UploadProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-experience"
          element={
            <ProtectedRoute>
              <ManageExperience />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
