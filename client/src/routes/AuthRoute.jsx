import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";

const AuthRoute = ({ children }) => {
  const { loggedIn } = useSelector(getAuthState);

  if (loggedIn) {
    return <Navigate to="/" />; // If there is a working token redirect to the home page
  }

  return children; // if not go to auth routes
};

export default AuthRoute;
