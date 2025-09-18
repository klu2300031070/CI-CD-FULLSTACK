import React, { useState } from 'react'
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from './config'

const BASE_URL = `${config.url}/hospitalapi`

export default function HospitalRegistrationForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    name: '',
    ownerName: '',
    address: '',
    contact: '',
    email: '',
    licenseNo: '',
    type: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      await axios.post(`${BASE_URL}/register`, form)
      toast.success('Hospital registered successfully!')
      setForm({
        username: '',
        name: '',
        ownerName: '',
        address: '',
        contact: '',
        email: '',
        licenseNo: '',
        type: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/hospital-login')
    } catch (error) {
      console.error(error)
      toast.error('Registration failed. Username or email might already exist.')
    }
  }

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" className="mb-4 text-center">
          Hospital Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Hospital Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Owner Name"
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              required
            />
            <TextField
              select
              label="Hospital Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="NGO">NGO</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Government">Government</MenuItem>
            </TextField>
            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
            <TextField
              label="Contact Number"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="License Number"
              name="licenseNo"
              value={form.licenseNo}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Register Hospital
            </Button>
          </Box>
        </form>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  )
}
