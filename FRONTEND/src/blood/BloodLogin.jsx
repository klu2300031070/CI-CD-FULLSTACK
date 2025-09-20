import React, { useState } from 'react'
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useAuth } from '../contextapi/AuthContext' // Your context
import { useNavigate, Link } from 'react-router-dom'
import config from './config'

export default function BloodLogin() {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const { setIsBloodBankLoggedIn, setIsHospitalLoggedIn, setIsOrganBankLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const baseUrl = `${config.url}`;
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${baseUrl}/checkbloodbanklogin`, loginData)

      // Assuming backend returns the BloodBank object on successful login
      if (res.status === 200 && res.data) {
        toast.success('Login successful!')

        sessionStorage.setItem('Blood_user', JSON.stringify(res.data))
        sessionStorage.setItem('isBloodBankLoggedIn', 'true')
        sessionStorage.setItem('isHospitalLoggedIn', 'false')
        sessionStorage.setItem('isOrganBankLoggedIn', 'false')

        setIsBloodBankLoggedIn(true)
        setIsHospitalLoggedIn(false)
        setIsOrganBankLoggedIn(false)

        setTimeout(() => {
          navigate('/bloodregistrartion') // Make sure this route matches your actual route
        }, 1500)
      }
    } catch (err) {
      console.error('Login error:', err)

      if (err.response && err.response.status === 401) {
        toast.error('Invalid username or password!')
      } else {
        toast.error('Server error during login, please try again later.')
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow" style={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">
            Blood Bank Login
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
              <Link to="/bloodbankregister">Register here</Link>
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
