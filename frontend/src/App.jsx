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
  return (
    <>
      <Routes>
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
    </>
  );
}
