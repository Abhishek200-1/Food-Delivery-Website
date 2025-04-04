import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
  Stack,
  Checkbox,
  IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Google, Facebook, Twitter, Instagram } from "@mui/icons-material";

const AuthContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  background: "#1e1e1e",
});

const StyledCard = styled(Card)(({ isRegistering }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "30px",
  gap: "20px",
  margin: "auto",
  maxWidth: isRegistering ? "700px" : "500px",
  backgroundColor: "#2a2a2a",
  color: "#d1d1d1",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "12px",
}));

const SoftButton = styled(Button)({
  backgroundColor: "#4caf50",
  color: "#ffffff",
  fontWeight: "500",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  borderRadius: "10px",
  fontSize: "16px",
  padding: "12px",
});

const SocialButton = styled(IconButton)({
  fontSize: "30px",
  "&:hover": {
    opacity: 0.8,
  },
});

const inputStyles = {
  "& .MuiInputBase-input::placeholder": {
    color: "#b0b0b0", 
    opacity: 1,
  },
  "& .MuiInputLabel-root": {
    color: "#b0b0b0", 
  },
};

const AdminAuth = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfJoining: "",
    email: "",
    mobileNumber: "",
    address: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // Added state for terms
  const [error, setError] = useState("");

  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "Q") {
        setIsRegistering((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegistering && !termsAccepted) {
      alert("You must agree to the Terms and Conditions before registering.");
      return;
    }

    const url = isRegistering
      ? "http://localhost:3000/api/admin/register"
      : "http://localhost:3000/api/admin/login";

    try {
      const response = await axios.post(url, formData);
      if (!isRegistering) {
        localStorage.setItem("adminToken", response.data.token);
        onLoginSuccess();
      } else {
        alert("Admin registered successfully! Please login.");
        setIsRegistering(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <AuthContainer>
      <StyledCard isRegistering={isRegistering} variant="outlined">
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={assets.logo4} alt="Company Logo" style={{ width: "100px", height: "auto" }} />
        </Box>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "600", textAlign: "left" }}>
          {isRegistering ? "Admin Registration" : "Admin Login"}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <Stack direction="row" spacing={2}>
                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required sx={inputStyles} />
                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth required sx={inputStyles} />
              </Stack>
              <TextField label="Date of Joining" type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true, sx: { color: "#b0b0b0" } }} sx={{ input: { color: "#b0b0b0" } }} />
              <TextField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} fullWidth required sx={inputStyles} />
              <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth required sx={inputStyles} />
            </>
          )}
          <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} fullWidth required sx={inputStyles} />
          <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth required sx={inputStyles} />

          {isRegistering && (
            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
              label="I agree to the Terms and Conditions"
              sx={{ color: "#b0b0b0" }}
            />
          )}

          <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />} label="Remember Me" />

          <SoftButton type="submit" fullWidth>{isRegistering ? "Register" : "Login"}</SoftButton>

          <Divider sx={{ bgcolor: "#555", my: 2 }}>OR</Divider>

          <Stack direction="row" spacing={2} justifyContent="center">
            <SocialButton sx={{ color: "#db4437" }}><Google /></SocialButton>
            <SocialButton sx={{ color: "#4267B2" }}><Facebook /></SocialButton>
            <SocialButton sx={{ color: "#1DA1F2" }}><Twitter /></SocialButton>
            <SocialButton sx={{ color: "#E1306C" }}><Instagram /></SocialButton>
          </Stack>
        </Box>
      </StyledCard>
    </AuthContainer>
  );
};

export default AdminAuth;
