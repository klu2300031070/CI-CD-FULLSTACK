import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import OrganRegistration from './OrganRegistration'
import OrganAviability from './OrganAviability'
import OrganRequest from './OrganRequest'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import OrganLogin from './OrganLogin'
import { useAuth } from '../contextapi/AuthContext'

export default function OrganNavBar() {
  const { setIsOrganBankLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsOrganBankLoggedIn(false)
    navigate('/organlogin')
  }

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar className="d-flex justify-content-between">
          <Typography variant="h6" className="text-white">
            Organ Donation System
          </Typography>
          <Box className="d-flex gap-3">
            <Link to="organregistartion" className="text-decoration-none">
              <Button variant="contained" color="secondary">Registration</Button>
            </Link>
            <Link to="/organaviaviablity" className="text-decoration-none">
              <Button variant="contained" color="secondary">Organ Availability</Button>
            </Link>
            <Link to="/organrequest" className="text-decoration-none">
              <Button variant="contained" color="secondary">Organ Request</Button>
            </Link>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container className="mt-4">
        <Routes>
          <Route path="/organregistartion" element={<OrganRegistration />} />
          <Route path="/organaviaviablity" element={<OrganAviability />} />
          <Route path="/organrequest" element={<OrganRequest />} />
          <Route path="/organlogin" element={<OrganLogin />} />
        </Routes>
      </Container>
    </>
  )
}
