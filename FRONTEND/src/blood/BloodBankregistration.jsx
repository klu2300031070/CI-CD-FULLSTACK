import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function BloodBankRegistration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    location: '',
    typeorg: '',
    phone: '',
    email: '',
    ownername: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting form:', form)

    try {
      const res = await axios.post('http://localhost:2506/registerbloodbank', form)
      console.log('Success response:', res.data)
      toast.success('Blood bank registered successfully!')

      setForm({
        name: '',
        username: '',
        password: '',
        location: '',
        typeorg: '',
        phone: '',
        email: '',
        ownername: ''
      })
      navigate("/bloodbank-login")
    } catch (err) {
      console.error('Error on submit:', err)
      toast.error('Failed to register blood bank.')
    }
  }

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" className="mb-4 text-center">
          Blood Bank Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Blood Bank Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Username"
              name="username"
              value={form.username}
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
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />

            {/* Dropdown for Organization Type */}
            <FormControl fullWidth required>
              <InputLabel>Organization Type</InputLabel>
              <Select
                name="typeorg"
                value={form.typeorg}
                onChange={handleChange}
                label="Organization Type"
              >
                <MenuItem value="NGO">NGO</MenuItem>
                <MenuItem value="GOVERNMENT">GOVERNMENT</MenuItem>
                <MenuItem value="PRIVATE">PRIVATE</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Contact Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Owner Name"
              name="ownername"
              value={form.ownername}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  )
}
