import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Notify app of authentication change
      window.dispatchEvent(new Event("auth-change"));

      // Navigate based on role
      navigate(res.data.user.role === "driver" ? "/" : "/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-logo" onClick={() => navigate("/")}>
          Uber
        </div>

        <div className="login-left-content">
          <h1 className="login-left-title">Welcome back to your journey</h1>
          <p className="login-left-description">
            Sign in to access your rides, track your drivers, and manage your
            account. Your next adventure is just a login away.
          </p>
        </div>

        <div className="login-left-footer">© 2025 Uber Technologies Inc.</div>
      </div>
      <div className="login-right">
        <Container maxWidth="sm" className="login-form-container">
          <Typography variant="h5" gutterBottom>
            Sign in
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Enter your credentials to continue
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gap: 2, mt: 2 }}
          >
            <TextField
              label="Email"
              type="email"
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

            {error && (
              <Typography color="error" sx={{ display: "flex", gap: 1 }}>
                ⚠️ {error}
              </Typography>
            )}

            <div className="forgot-password">
              <a href="#forgot" className="forgot-password-link">
                Forgot password?
              </a>
            </div>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </Box>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>

          <div className="social-login">
            <button className="social-btn" type="button">
              <span className="social-icon">G</span>
              <span>Continue with Google</span>
            </button>
            <button className="social-btn" type="button">
              <span className="social-icon">f</span>
              <span>Continue with Facebook</span>
            </button>
          </div>

          <div className="signup-prompt">
            Don’t have an account?{" "}
            <a
              href="#signup"
              className="signup-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign up
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
}
