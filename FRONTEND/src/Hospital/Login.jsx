import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextapi/AuthContext'; // Import context
import { useNavigate } from 'react-router-dom'; // Navigation

export default function BloodLogin() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const { setIsBloodBankLoggedIn, setIsHospitalLoggedIn, setIsOrganBankLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginData.username === "hop" && loginData.password === "hop123") {
      toast.success('Login successful!');

      // Store user info and update context
      sessionStorage.setItem('Blood_user', JSON.stringify({ username: loginData.username }));
      sessionStorage.setItem('isBloodBankLoggedIn', 'false');
      sessionStorage.setItem('isHospitalLoggedIn', 'true');
      sessionStorage.setItem('isOrganBankLoggedIn', 'false');

      setIsBloodBankLoggedIn(false);
      setIsHospitalLoggedIn(true);
      setIsOrganBankLoggedIn(false);

      // Navigate to blood dashboard
     } else {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow" style={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">
            Hospital Login
          </Typography>

          <form onSubmit={handleLogin}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
