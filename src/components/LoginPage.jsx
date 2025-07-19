import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axios from 'axios';
const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default role
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [messageType, setMessageType] = useState("success");
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/loginChecked", {
        email,
        password,
        role,
      });
if (res.data.role === "customer") {
  setSuccessMessage(`🎉 Logged in as ${role}. Redirecting...`);
  setMessageType("success");
  setemail("");
  setPassword("");
  setTimeout(() => setFadeOut(true), 1000);
  setTimeout(() => navigate(`/home`), 2500);
} else if (res.data.role === "driver") {
  setSuccessMessage(`🎉 Logged in as ${role}. Redirecting...`);
  setMessageType("success");
  setemail("");
  setPassword("");
  setTimeout(() => setFadeOut(true), 1000);
  setTimeout(() => navigate(`/${role}home`), 2500);
} else {
  setSuccessMessage("❌ Invalid Credentials!");
  setMessageType("error");
  setTimeout(() => {
    setSuccessMessage("");
    setFadeOut(false);
  }, 2000); // Hides message after 3 seconds
}
    } catch (error) {
      console.error("Login error:", error);
  setSuccessMessage("❌ Something went wrong. Please try again.");
  setMessageType("error");
  setTimeout(() => {
    setSuccessMessage("");
    setFadeOut(false);
  }, 2000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <div className="role-toggle">
          <button
            className={role === "customer" ? "active" : ""}
            onClick={() => setRole("customer")}
          >
            Customer
          </button>
          <button
            className={role === "driver" ? "active" : ""}
            onClick={() => setRole("driver")}
          >
            Driver
          </button>
        </div>
        {successMessage && (
          <div className={`success-message ${messageType} ${fadeOut ? 'fade-out' : ''}`}>
            {successMessage}
          </div>
        )}
        <form className="login-form" onSubmit={loginFormSubmit}>
          <div className="input-group">
            <input
              type="email"
              required
              placeholder=" "
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <button type="submit" className="login-btn">Login</button>
          <p className="login-link">
            Don’t have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
