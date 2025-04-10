import React, { useContext, useState } from "react";
import "./ResetPassword.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-3

  const handleEmailSubmit = async () => {
    if (!email) {
      setError("Please enter an email.");
      return;
    }
  
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/user/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setError("");
        setStep(2);
      } else {
        setError(data.message || "Email verification failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };  

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });

    // Check password strength
    if (name === "new") {
      let strength = 0;
      if (value.length >= 6) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength > 3 ? 3 : strength);
    }
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Good";
    return "Strong";
  };

  const handleResetPassword = async () => {
    if (passwords.new !== passwords.confirm) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: passwords.new }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password reset successfully!");
        setEmail("");
        setPasswords({ new: "", confirm: "" });
        setPasswordStrength(0);
        setStep(1);
        setError("");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>

      {step === 1 ? (
        <div className="step">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input"
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleEmailSubmit} className="btn">Verify Email</button>
        </div>
      ) : (
        <div className="step">
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="input"
          />

          {/* Password Strength Bar */}
          <div className="password-strength-container">
            <div className="password-strength-bar">
              <div className="bar" style={{ width: `${(passwordStrength / 3) * 100}%` }}></div>
            </div>
            <p className={`strength-label level-${passwordStrength}`}>
              {getStrengthLabel()}
            </p>
          </div>

          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            placeholder="Confirm New Password"
            className="input"
          />

          {error && <p className="error-message">{error}</p>}

          <div className="button-group">
            <button onClick={handleResetPassword}>Reset Password</button>
            <button onClick={() => setPasswords({ new: "", confirm: "" })}>Reset Form</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
