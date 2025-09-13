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
    navigate('/bloodlogin') // Redirect to login page
  }

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar className="d-flex justify-content-between">
          <Typography variant="h6" className="text-white">
            Blood Donation System
          </Typography>
          <Box className="d-flex gap-3">
            <Link to="/bloodregistrartion" className="text-decoration-none">
              <Button variant="contained" color="secondary">Registration</Button>
            </Link>
            <Link to="/organaviaviablity" className="text-decoration-none">
              <Button variant="contained" color="secondary">Blood Availability</Button>
            </Link>
            <Link to="/BloodRequest" className="text-decoration-none">
              <Button variant="contained" color="secondary">Blood Request</Button>
            </Link>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

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
