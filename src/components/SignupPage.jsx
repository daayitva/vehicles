import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import axios from 'axios';

const SignupPage = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [chckbox, setchckbox] = useState(false);
  const [role, setRole] = useState("customer"); // 'customer' or 'driver'
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [messageType, setMessageType] = useState("success");

  const signupFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/setUserData", {
        fullName,
        email,
        phoneNumber,
        password,
        chckbox,
        role,
      });
 
      if (res.data === "Data Saved ! ") {
        setSuccessMessage(`🎉 ${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully! Please login.`);
        setMessageType("success");

        setfullName("");
        setemail("");
        setPassword("");
        setphoneNumber("");
        setchckbox(false);

        setTimeout(() => setFadeOut(true), 1000);
        setTimeout(() => navigate("/"), 2500);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSuccessMessage("❌ Something went wrong. Please try again.");
      setMessageType("error");
    }
  }; 
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">GlobeGo</h2>

        <div className="role-toggle">
          <button
            type="button"
            className={role === "customer" ? "active" : ""}
            onClick={() => setRole("customer")}
          >
            Customer
          </button>
          <button
            type="button"
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

        <form className="signup-form" onSubmit={signupFormSubmit}>
          <div className="input-group">
            <input type="text" required placeholder=" " value={fullName} onChange={(e) => setfullName(e.target.value)} />
            <label>Full Name</label>
          </div>
          <div className="input-group">
            <input type="tel" required placeholder=" " value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} />
            <label>Mobile Number</label>
          </div>
          <div className="input-group">
            <input type="email" required placeholder=" " value={email} onChange={(e) => setemail(e.target.value)} />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input type="password" required placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Password</label>
          </div>
          
          <div className="checkbox-group">
            <input type="checkbox" id="terms" required checked={chckbox} onChange={(e) => setchckbox(e.target.checked)} />
            <label htmlFor="terms">
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
          <p className="auth-link">
            Already have an account? <Link to="/">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
