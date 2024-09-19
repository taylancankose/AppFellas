import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/" />; // If there is a working token redirect to the home page
  }

  return children; // if not go to auth routes
};

export default AuthRoute;
