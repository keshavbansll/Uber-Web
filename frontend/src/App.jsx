import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RiderDashboard from "./pages/RiderDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import NavBar from "./components/NavBar";

const getAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return token && user ? JSON.parse(user) : null;
};

const Protected = ({ children, role }) => {
  const user = getAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  // Add a key prop to force re-render when storage changes
  const [authKey, setAuthKey] = React.useState(0);

  // Listen for storage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      setAuthKey((prev) => prev + 1);
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab changes
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  return (
    <Routes key={authKey}>
      {/* Public Home Page */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/rider"
        element={
          <Protected role="rider">
            <NavBar />
            <RiderDashboard />
          </Protected>
        }
      />

      <Route
        path="/driver"
        element={
          <Protected role="driver">
            <NavBar />
            <DriverDashboard />
          </Protected>
        }
      />

      <Route
        path="*"
        element={<div style={{ padding: 20 }}>404 — Not Found</div>}
      />
    </Routes>
  );
}
