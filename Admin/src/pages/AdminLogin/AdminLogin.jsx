import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from '../../assets/assets';
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Alert,
  Link,
  Stack,
  Checkbox,
  FormControlLabel,
  IconButton,
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

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "30px",
  gap: "20px",
  margin: "auto",
  maxWidth: "450px",
  backgroundColor: "#2a2a2a",
  color: "#d1d1d1",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "12px",
});

const SoftButton = styled(Button)({
  backgroundColor: "#4caf50",
  color: "#ffffff",
  fontWeight: "500",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  borderRadius: "10px",
});

const AdminAuth = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegistering && !agreeTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

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
        setIsRegistering(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthContainer>
      <StyledCard variant="outlined">
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={assets.logo4} alt="Company Logo" style={{ width: "100px", height: "auto" }} />
        </Box>

        <Typography component="h1" variant="h5" sx={{ fontWeight: "600", textAlign: "left" }}>
          {isRegistering ? "Admin Registration" : "Admin Login"}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {isRegistering && (
            <FormControl>
              <FormLabel sx={{ color: "#d1d1d1" }}>Name</FormLabel>
              <TextField 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                fullWidth 
                placeholder="Your Name"
                sx={{ bgcolor: "#3a3a3a", borderRadius: "8px", color: "#d1d1d1" }} 
              />
            </FormControl>
          )}

          <FormControl>
            <FormLabel sx={{ color: "#d1d1d1" }}>Email</FormLabel>
            <TextField 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              fullWidth 
              placeholder="example@gmail.com"
              sx={{ bgcolor: "#3a3a3a", borderRadius: "8px", color: "#d1d1d1" }} 
            />
          </FormControl>

          <FormControl>
            <FormLabel sx={{ color: "#d1d1d1" }}>Password</FormLabel>
            <TextField 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              fullWidth 
              placeholder="••••••••"
              sx={{ bgcolor: "#3a3a3a", borderRadius: "8px", color: "#d1d1d1" }} 
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: "#d1d1d1" }} />}
            label={<Typography sx={{ color: "#d1d1d1" }}>Remember Me</Typography>}
          />

          {isRegistering && (
            <FormControlLabel
              control={<Checkbox checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} sx={{ color: "#d1d1d1" }} />}
              label={<Typography sx={{ color: "#d1d1d1" }}>I agree to the Terms & Conditions</Typography>}
            />
          )}

          <Divider sx={{ bgcolor: "#555" }}>OR</Divider>

          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton sx={{ color: "#db4437" }}><Google /></IconButton>
            <IconButton sx={{ color: "#4267B2" }}><Facebook /></IconButton>
            <IconButton sx={{ color: "#1DA1F2" }}><Twitter /></IconButton>
            <IconButton sx={{ color: "#1DA1F2" }}><Instagram /></IconButton>
          </Stack>

          <SoftButton type="submit" fullWidth variant="contained">
            {isRegistering ? "Register" : "Login"}
          </SoftButton>
        </Box>
      </StyledCard>
    </AuthContainer>
  );
};

export default AdminAuth;
