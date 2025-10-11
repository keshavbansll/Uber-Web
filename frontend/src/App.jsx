import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RiderDashboard from "./pages/RiderDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

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
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navigate to="/rider" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/rider"
          element={
            <Protected role="rider">
              <RiderDashboard />
            </Protected>
          }
        />

        <Route
          path="/driver"
          element={
            <Protected role="driver">
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
