import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import MyFlights from "./views/MyFlights";
import Header from "./ui/Header";
import Register from "./views/Register";
import Login from "./views/Login";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // if token exits login
      dispatch(login({ token }));
    }
  }, [dispatch]);

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
