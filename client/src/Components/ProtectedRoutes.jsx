import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("budgy_token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes
