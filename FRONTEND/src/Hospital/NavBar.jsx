import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../hospital/Login'; // Assuming path
import HospitalBloodRequest from './HospitalBloodRequest';
import HospitalOrganRequest from './HospitalOrganRequest';
import ViewAllBlood from './ViewAllBlood';
import ViewAllOrgan from './ViewAllOrgan';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextapi/AuthContext';

export default function NavBar() {
  const { setIsHospitalLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsHospitalLoggedIn(false);
    navigate('/hospitallogin'); // Redirect to login page
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar className="d-flex justify-content-between">
          <Typography variant="h6" className="text-white">
            Hospital Management System
          </Typography>
          <Box className="d-flex gap-3">
            <Link to="/hospital-blood-request" className="text-decoration-none">
              <Button variant="contained" color="secondary">Blood Requests</Button>
            </Link>
            <Link to="/hospital-organ-request" className="text-decoration-none">
              <Button variant="contained" color="secondary">Organ Requests</Button>
            </Link>
            <Link to="/view-all-blood" className="text-decoration-none">
              <Button variant="contained" color="secondary">View Blood</Button>
            </Link>
            <Link to="/view-all-organ" className="text-decoration-none">
              <Button variant="contained" color="secondary">View Organs</Button>
            </Link>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page routing for hospital */}
      <Routes>
        <Route path="/hospital-blood-request" element={<HospitalBloodRequest />} />
        <Route path="/hospital-organ-request" element={<HospitalOrganRequest />} />
        <Route path="/view-all-blood" element={<ViewAllBlood />} />
        <Route path="/view-all-organ" element={<ViewAllOrgan />} />
        <Route path="/hospitallogin" element={<Login />} />
      </Routes>
    </>
  );
}
