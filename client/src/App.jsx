import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import MyFlights from "./views/MyFlights";
import Header from "./ui/Header";
import Register from "./views/Register";
import Login from "./views/Login";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
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

          {/* Auth routes, sadece token yoksa erişilebilir */}
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
