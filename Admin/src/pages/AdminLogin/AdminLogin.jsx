import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css"; // Import separate CSS file

const AdminAuth = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for registration
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isRegistering
      ? "http://localhost:3000/api/admin/register"
      : "http://localhost:3000/api/admin/login";

    const payload = isRegistering ? { name, email, password } : { email, password };

    try {
      const response = await axios.post(url, payload);
      if (!isRegistering) {
        localStorage.setItem("adminToken", response.data.token);
        onLoginSuccess();
      } else {
        setIsRegistering(false); // Switch back to login after registration
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="auth-popup">
        <h2>{isRegistering ? "Admin Registration" : "Admin Login"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <p className="toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "New here? Register"}
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
