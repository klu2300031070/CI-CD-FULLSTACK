import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from './config'

const BASE_URL = `${config.url}/hospitalapi`

export default function HospitalUpdateForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    id: '',
    username: '',
    name: '',
    ownerName: '',
    address: '',
    contact: '',
    email: '',
    licenseNo: '',
    type: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch hospital data from sessionStorage on mount
    const hospitalData = sessionStorage.getItem('Hospital_user')
    if (hospitalData) {
      const parsed = JSON.parse(hospitalData)
      setForm({
        id: parsed.id || '', 
        username: parsed.username || '',
        name: parsed.name || '',
        ownerName: parsed.ownerName || '',
        address: parsed.address || '',
        contact: parsed.contact || '',
        email: parsed.email || '',
        licenseNo: parsed.licenseNo || '',
        type: parsed.type || ''
      })
    } else {
      toast.error('No hospital data found in session! Please log in.')
      navigate('/hospital-login') // Or appropriate route
    }
    setLoading(false)
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!form.id) {
    toast.error('Hospital ID missing. Cannot update.')
    return
  }

  const payload = {
    username: form.username,
    name: form.name,
    ownerName: form.ownerName,
    address: form.address,
    contact: form.contact,
    email: form.email,
    licenseNo: form.licenseNo,
    type: form.type
  }

  try {
    const response = await axios.put(`${BASE_URL}/hospitals/${form.id}`, payload)
    toast.success('Hospital information updated successfully!')

    // Update sessionStorage with fresh server response or current form data
    const updatedHospital = response.data || form
    sessionStorage.setItem('Hospital_user', JSON.stringify(updatedHospital))

    navigate('/hospital-dashboard')
  } catch (error) {
    console.error(error)
    toast.error('Update failed. Please check the inputs or try again.')
  }
}


  if (loading) {
    return <Typography variant="h6" align="center">Loading hospital data...</Typography>
  }

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" className="mb-4 text-center">
          Update Hospital Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Hospital ID"
              name="id"
              value={form.id}
              disabled
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Username"
              name="username"
              value={form.username}
              disabled
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Hospital Name"
              name="name"
              value={form.name}
              disabled
              InputProps={{ readOnly: true }}
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
              disabled
              InputProps={{ readOnly: true }}
            />
            <Button type="submit" variant="contained" color="primary">
              Update Hospital
            </Button>
          </Box>
        </form>

        <ToastContainer position="top-center" autoClose={3000} style={{ zIndex: 9999 }} />
      </div>
    </div>
  )
}
