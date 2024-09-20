import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useSelector(getAuthState);

  if (!loggedIn) {
    return <Navigate to="/auth/login" />; // If there is no token redirect to Login page
  }

  return children; // if there is token go to the desired page
};

export default ProtectedRoute;
