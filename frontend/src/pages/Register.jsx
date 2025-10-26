import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      // Navigate based on role
      if (res.data.user.role === "driver") {
        navigate("/driver");
      } else {
        navigate("/rider");
      }
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
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Safe and secure rides</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>24/7 customer support</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Flexible payment options</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Real-time tracking</span>
            </div>
          </div>
        </div>

        <div className="register-left-footer">
          © 2025 Uber Technologies Inc.
        </div>
      </div>

      <div className="register-right">
        <div className="register-form-container">
          <h2 className="register-form-title">Create account</h2>
          <p className="register-form-subtitle">
            Sign up to get started with Uber
          </p>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                className="input-field"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="input-group">
              <label className="input-label">I want to</label>
              <div className="role-selection">
                <label
                  className={`role-option ${
                    role === "rider" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="rider"
                    checked={role === "rider"}
                    onChange={() => setRole("rider")}
                    className="role-radio"
                  />
                  <div className="role-content">
                    <div className="role-title">Ride with Uber</div>
                    <div className="role-description">
                      Request rides and get to your destination
                    </div>
                  </div>
                  <span className="role-icon">🚗</span>
                </label>

                <label
                  className={`role-option ${
                    role === "driver" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="driver"
                    checked={role === "driver"}
                    onChange={() => setRole("driver")}
                    className="role-radio"
                  />
                  <div className="role-content">
                    <div className="role-title">Drive with Uber</div>
                    <div className="role-description">
                      Earn money on your schedule
                    </div>
                  </div>
                  <span className="role-icon">🚙</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
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

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
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

          <div className="login-prompt">
            Already have an account?
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
        </div>
      </div>
    </div>
  );
}
