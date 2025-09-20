import React from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { useAuth } from '../contextapi/AuthContext'

// Import your two pages
import ViewAllBloodBanks from './ViewAllBloodBanks'
import ViewAllHospitals from './ViewAllHospitals'

export default function AdminNavBar() {
  const { clearAllAuth } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAllAuth()
    navigate('/')
  }

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar className="d-flex justify-content-between">
          <Typography variant="h6" className="text-white">
            Admin Page
          </Typography>

          <Box className="d-flex gap-3">
            <Link to="/admin/bloodbanks" className="text-decoration-none">
              <Button variant="contained" color="secondary">View Blood Banks</Button>
            </Link>
            <Link to="/admin/hospitals" className="text-decoration-none">
              <Button variant="contained" color="secondary">View Hospitals</Button>
            </Link>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
      </Box>

      <Container className="mt-4">
        <Routes>
          <Route path="/admin/bloodbanks" element={<ViewAllBloodBanks />} />
          <Route path="/admin/hospitals" element={<ViewAllHospitals />} />
        </Routes>
      </Container>
    </>
  )
}
