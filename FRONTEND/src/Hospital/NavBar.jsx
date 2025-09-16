import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextapi/AuthContext';
import BloodRequest from './BloodRequest';
import BloodRequestStatus from './BloodRequestStatus';
import BloodAvailability from './BloodAvailability';
import HospitalLogin from './HospitalLogin';
import HospitalUpdateForm from './HospitalUpdateForm';

export default function NavBar() {
  const { setIsHospitalLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsHospitalLoggedIn(false);
    navigate('/hospital-login'); // Redirect to login page
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar className="d-flex justify-content-between">
          <Typography variant="h6" className="text-white">
            Hospital Management System
          </Typography>
          <Box className="d-flex gap-3">
            <Link to="/blood-request" className="text-decoration-none">
              <Button variant="contained" color="secondary">Blood Requests</Button>
            </Link>
            <Link to="/blood-availability" className="text-decoration-none">
              <Button variant="contained" color="secondary">Blood Availability</Button>
            </Link>
            <Link to="/blood-request-status" className="text-decoration-none">
              <Button variant="contained" color="secondary">Request Status</Button>
            </Link>
            <Link to="/update-profile" className="text-decoration-none">
              <Button variant="contained" color="secondary">Profile Update</Button>
            </Link>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page routing for hospital */}
      <Routes>
        <Route path="/blood-request" element={<BloodRequest/>} />
        <Route path="/blood-availability" element={<BloodAvailability/>} />
        <Route path="/blood-request-status" element={<BloodRequestStatus />} />
        <Route path="/update-profile" element={<HospitalUpdateForm />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
      </Routes>
    </>
  );
}
