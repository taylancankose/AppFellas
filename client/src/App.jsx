import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import MyFlights from "./views/MyFlights";
import Header from "./ui/Header";
import Register from "./views/Register";
import Login from "./views/Login";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./views/NotFound";
import {
  getAuthState,
  updateLoading,
  updateLoggedIn,
  updateUser,
} from "./store/auth";
import { getFromLocalStorage, Keys } from "./utils/localStorage";
import client from "./api/client";

function App() {
  const dispatch = useDispatch();
  const getAuthStatus = async () => {
    dispatch(updateLoading(true));
    try {
      const token = getFromLocalStorage(Keys.AUTH_TOKEN);
      if (!token) {
        dispatch(updateLoading(false));
        return;
      }

      const { data } = await client.get("/auth/is-auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateUser(data.user));
      dispatch(updateLoggedIn(true));
    } catch (error) {
      console.log("Auth error: " + error);
    }
    dispatch(updateLoading(false));
  };

  useEffect(() => {
    getAuthStatus();
  }, []);
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Header />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          {/* Protected routes */}
          <Route
            path="/my-flights/:id"
            element={
              <ProtectedRoute>
                <MyFlights />
              </ProtectedRoute>
            }
          />

          {/* Auth routes */}
          <Route
            path="/auth/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />
          <Route
            path="/auth/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
