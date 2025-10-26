import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("rider");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Notify app of authentication change
      window.dispatchEvent(new Event("auth-change"));

      // Navigate based on role
      navigate(res.data.user.role === "driver" ? "/driver" : "/rider");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-logo" onClick={() => navigate("/")}>
          Uber
        </div>

        <div className="register-left-content">
          <h1 className="register-left-title">Start your journey with Uber</h1>
          <p className="register-left-description">
            Join millions of riders and drivers who trust Uber for safe,
            reliable transportation every day.
          </p>

          <div className="register-features">
            {[
              "Safe and secure rides",
              "24/7 customer support",
              "Flexible payment options",
              "Real-time tracking",
            ].map((text, i) => (
              <div key={i} className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="register-left-footer">
          © 2025 Uber Technologies Inc.
        </div>
      </div>

      <div className="register-right">
        <Container maxWidth="sm" className="register-form-container">
          <Typography variant="h5" gutterBottom>
            Create account
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Sign up to get started with Uber
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gap: 2, mt: 2 }}
          >
            <TextField
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              inputProps={{ minLength: 6 }}
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                I want to
              </Typography>
              <div className="role-selection">
                {[
                  {
                    type: "rider",
                    title: "Ride with Uber",
                    desc: "Request rides and get to your destination",
                    icon: "🚗",
                  },
                  {
                    type: "driver",
                    title: "Drive with Uber",
                    desc: "Earn money on your schedule",
                    icon: "🚙",
                  },
                ].map((opt) => (
                  <label
                    key={opt.type}
                    className={`role-option ${
                      role === opt.type ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={opt.type}
                      checked={role === opt.type}
                      onChange={() => setRole(opt.type)}
                      className="role-radio"
                    />
                    <div className="role-content">
                      <div className="role-title">{opt.title}</div>
                      <div className="role-description">{opt.desc}</div>
                    </div>
                    <span className="role-icon">{opt.icon}</span>
                  </label>
                ))}
              </div>
            </Box>

            {error && (
              <Typography color="error" sx={{ display: "flex", gap: 1 }}>
                ⚠️ {error}
              </Typography>
            )}

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>
                I agree to Uber's{" "}
                <a href="#terms" className="terms-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="terms-link">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Creating
                  account...
                </>
              ) : (
                "Create account"
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

          <div className="login-prompt">
            Already have an account?{" "}
            <a
              href="#login"
              className="login-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Sign in
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
}
