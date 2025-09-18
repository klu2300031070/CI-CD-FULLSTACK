import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import BloodRegistration from './BloodRegistration'
import BloodAviability from './BloodAviability'
import BloodRequest from './BloodRequest'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import BloodLogin from './BloodLogin'
import { useAuth } from '../contextapi/AuthContext'
import BloodBankRegistration from './bloodbankregistration'

export default function BloodNavBar() {
  const { setIsBloodBankLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsBloodBankLoggedIn(false)
    navigate('/') 
  }

  const bloodUser = JSON.parse(sessionStorage.getItem('Blood_user'))
  const loggedInOrg = bloodUser?.name || 'Your Organization'

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar className="d-flex justify-content-between">
          <Typography variant="h6" className="text-white">
            Blood Donation System
          </Typography>

          <Box className="d-flex gap-3">
            <Link to="/bloodbankdashboard" className="text-decoration-none">
              <Button variant="contained" color="secondary">Home</Button>
            </Link>
            <Link to="/bloodregistrartion" className="text-decoration-none">
              <Button variant="contained" color="secondary">Donor Register</Button>
            </Link>
            <Link to="/organaviaviablity" className="text-decoration-none">
              <Button variant="contained" color="secondary">Donor Records</Button>
            </Link>
            <Link to="/BloodRequest" className="text-decoration-none">
              <Button variant="contained" color="secondary">Blood Request</Button>
            </Link>
            <Link to="/bloodbankprofile" className="text-decoration-none">
              <Button variant="contained" color="secondary">Profile</Button>
            </Link>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Centered Org Name Below Navbar */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          {loggedInOrg}
        </Typography>
      </Box>

      {/* Page Container */}
      <Container className="mt-4">
        <Routes>
          <Route path="/bloodregistrartion" element={<BloodRegistration />} />
          <Route path="/organaviaviablity" element={<BloodAviability />} />
          <Route path="/BloodRequest" element={<BloodRequest />} />
          <Route path="/bloodlogin" element={<BloodLogin />} />
          <Route path='/bloodbankregister' element={<BloodBankRegistration/>} />
        </Routes>
      </Container>
    </>
  )
}
