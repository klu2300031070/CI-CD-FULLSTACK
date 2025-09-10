// src/organs/OrganLogin.jsx
import React, { useState } from 'react'
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../contextapi/AuthContext'

export default function OrganLogin() {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const {
    setIsBloodBankLoggedIn,
    setIsHospitalLoggedIn,
    setIsOrganBankLoggedIn,
  } = useAuth()

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (loginData.username === 'organ' && loginData.password === 'organ123') {
      toast.success('Login successful!')

      sessionStorage.setItem('Blood_user', JSON.stringify({ username: loginData.username }))
      setIsBloodBankLoggedIn(false)
      setIsHospitalLoggedIn(false)
      setIsOrganBankLoggedIn(true)

    } else {
      toast.error('Invalid credentials!')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ maxWidth: 400, width: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Organ Login
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
        </CardContent>
      </Card>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}
