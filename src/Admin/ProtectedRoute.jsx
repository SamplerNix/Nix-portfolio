import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const isLoggedIn = localStorage.getItem("adminAuth");

  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  return children;
}

export default ProtectedRoute;