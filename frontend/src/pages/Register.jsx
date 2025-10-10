import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import api from "../api";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("rider");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "driver") nav("/driver");
      else nav("/rider");
    } catch (error) {
      setErr(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Box>
          <label style={{ marginRight: 8 }}>
            <input
              type="radio"
              name="role"
              value="rider"
              checked={role === "rider"}
              onChange={() => setRole("rider")}
            />{" "}
            Rider
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="driver"
              checked={role === "driver"}
              onChange={() => setRole("driver")}
            />{" "}
            Driver
          </label>
        </Box>
        {err && <Typography color="error">{err}</Typography>}
        <Button variant="contained" type="submit">
          Create account
        </Button>
      </Box>
    </Container>
  );
}
