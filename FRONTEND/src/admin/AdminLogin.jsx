import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contextapi/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config';

export default function AdminLogin() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const { setIsAdminLoggedIn, setIsHospitalLoggedIn, setIsBloodBankLoggedIn, setIsOrganBankLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/login`, {
        username: loginData.username,
        password: loginData.password,
      });

      if (response.status === 200) {
        const adminData = response.data;
        toast.success('Admin login successful!');

        // Save admin session
        sessionStorage.setItem('Admin_user', JSON.stringify(adminData));
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        sessionStorage.setItem('isHospitalLoggedIn', 'false');
        sessionStorage.setItem('isBloodBankLoggedIn', 'false');
        sessionStorage.setItem('isOrganBankLoggedIn', 'false');

        // Update context
        setIsAdminLoggedIn(true);
        setIsHospitalLoggedIn(false);
        setIsBloodBankLoggedIn(false);
        setIsOrganBankLoggedIn(false);

        navigate('/admin/dashboard'); // Navigate to admin dashboard after login
      }
    } catch (error) {
      toast.error('Invalid username or password!');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow" style={{ maxWidth: 420, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">Admin Login</Typography>
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
              <Button type="submit" variant="contained" color="primary">Login</Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
}
