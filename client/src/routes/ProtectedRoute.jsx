import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/auth/login" />; // If there is no token redirect to Login page
  }

  return children; // if there is token go to the desired page
};

export default ProtectedRoute;
