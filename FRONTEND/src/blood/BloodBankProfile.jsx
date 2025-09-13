// src/pages/BloodProfile.js

import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BloodProfile() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    // Add any other properties from your BloodBank model
  })

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('Blood_user'))

    if (!userData) {
      navigate('/bloodlogin') // Redirect if not logged in
    } else {
      setProfile({
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        // Add other fields if needed
      })
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/bloodlogin')
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow" style={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">
            Blood Bank Profile
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography><strong>ID:</strong> {profile.id}</Typography>
            <Typography><strong>Name:</strong> {profile.name}</Typography>
            <Typography><strong>Username:</strong> {profile.username}</Typography>
            <Typography><strong>Email:</strong> {profile.email}</Typography>
            <Typography><strong>Phone:</strong> {profile.phone}</Typography>
            <Typography><strong>Address:</strong> {profile.address}</Typography>
          </Box>

          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/bloodbankdashboard')}>
              Go to Dashboard
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
