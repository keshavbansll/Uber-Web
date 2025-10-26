import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      // Navigate based on role
      if (res.data.user.role === "driver") {
        navigate("/driver");
      } else {
        navigate("/rider");
      }
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
        <div className="login-form-container">
          <h2 className="login-form-title">Sign in</h2>
          <p className="login-form-subtitle">
            Enter your credentials to continue
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="forgot-password">
              <a href="#forgot" className="forgot-password-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

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
            Don't have an account?
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
        </div>
      </div>
    </div>
  );
}
