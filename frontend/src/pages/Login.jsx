import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import api from "../api";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // navigate based on role
      if (res.data.user.role === "driver") nav("/driver");
      else nav("/rider");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
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
        {err && <Typography color="error">{err}</Typography>}
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Container>
  );
}
