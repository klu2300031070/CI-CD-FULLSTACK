import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextapi/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from './config';

const BASE_URL = `${config.url}/hospitalapi`;

export default function HospitalLogin() {
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

    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);

      if (response.status === 200) {
        const hospitalData = response.data; // assuming API returns hospital details

        toast.success('Login successful!');

        // Store all hospital info (except password) in sessionStorage
        sessionStorage.setItem('Hospital_user', JSON.stringify({
          id: hospitalData.id,
          username: hospitalData.username,
          name: hospitalData.name,
          ownerName: hospitalData.ownerName,
          address: hospitalData.address,
          contact: hospitalData.contact,
          email: hospitalData.email,
          licenseNo: hospitalData.licenseNo,
          type: hospitalData.type
        }));

        sessionStorage.setItem('isBloodBankLoggedIn', 'false');
        sessionStorage.setItem('isHospitalLoggedIn', 'true');
        sessionStorage.setItem('isOrganBankLoggedIn', 'false');

        setIsBloodBankLoggedIn(false);
        setIsHospitalLoggedIn(true);
        setIsOrganBankLoggedIn(false);

        navigate('/blood-request-status');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Invalid username or password!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
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

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/hospital-registration" style={{ textDecoration: 'none' }}>
                <Button variant="text" color="secondary">Register here</Button>
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
