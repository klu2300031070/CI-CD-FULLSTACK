import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextapi/AuthContext'; // Import context
import { useNavigate, Link } from 'react-router-dom'; // Navigation

export default function BloodLogin() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const { setIsBloodBankLoggedIn, setIsHospitalLoggedIn, setIsOrganBankLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login Data:", loginData); 
    if (loginData.username === 'bank' && loginData.password === 'bank123') {
      toast.success('Login successful!');

      
      sessionStorage.setItem('Blood_user', JSON.stringify({ username: loginData.username })); 
      sessionStorage.setItem('isBloodBankLoggedIn', 'true');
      sessionStorage.setItem('isHospitalLoggedIn', 'false');
      sessionStorage.setItem('isOrganBankLoggedIn', 'false');

      setIsBloodBankLoggedIn(true);
      setIsHospitalLoggedIn(false);
      setIsOrganBankLoggedIn(false);

     

      // Navigate to blood registration page
      setTimeout(() => {
        navigate('/bloodregistrartion');
      }, 1500);
    } else {
      toast.error('Invalid credentials!');
      console.log('Invalid login attempt');
    }

    // Uncomment this code if you're actually sending a request to the backend
    /*
    const response = await axios.post('http://localhost:5000/api/login', loginData);
    if (response.data.success) {
      toast.success('Login successful!');
      sessionStorage.setItem('Blood_user', JSON.stringify(response.data.user));
      sessionStorage.setItem('isBloodBankLoggedIn', 'true');
      sessionStorage.setItem('isHospitalLoggedIn', 'false');
      sessionStorage.setItem('isOrganBankLoggedIn', 'false');

      setIsBloodBankLoggedIn(true);
      setIsHospitalLoggedIn(false);
      setIsOrganBankLoggedIn(false);

      setTimeout(() => {
        navigate('/bloodregistrartion');
      }, 1500);
    } else {
      toast.error('Invalid credentials!');
    }
    */
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow" style={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">Blood Bank Login</Typography>
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
              /> <Link to="/bloodbankregister">Register here</Link>
              <Button type="submit" variant="contained" color="primary">Login</Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="top-center" autoClose={3000} />
     
    </div>
  );
}
