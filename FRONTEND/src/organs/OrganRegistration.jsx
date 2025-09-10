import React, { useState } from 'react'
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

export default function OrganRegistration() {
  const [form, setForm] = useState({
    fullName: '',
    phoneno: '',
    bloodType: '',
    organ: '',
    gender: '',
    org: '',
    location: '' // Added location field
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic frontend validation
    if (!form.fullName || !form.phoneno || !form.bloodType || !form.organ || !form.gender || !form.org || !form.location) {
      toast.error('Please fill in all required fields.')
      return
    }

    try {
      const response = await axios.post('http://localhost:2506/registerorgandonor', form)
      toast.success('Organ Donor Registered Successfully!')
      console.log('Server Response:', response.data)

      // Reset form
      setForm({
        fullName: '',
        phoneno: '',
        bloodType: '',
        organ: '',
        gender: '',
        org: '',
        location: '' // Reset location field
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Organ Donor Registration Failed!')
    }
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  const organs = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas']
  const genders = ['Male', 'Female', 'Other']
  const organizations = ['Dera Sacha Sauda', 'Shatayu', 'Gift Your Organ Foundation']

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" className="mb-4 text-center">
          Organ Donor Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />

            <TextField
              label="Phone Number"
              name="phoneno"
              value={form.phoneno}
              onChange={handleChange}
              required
            />

            <TextField
              select
              label="Blood Group"
              name="bloodType"
              value={form.bloodType}
              onChange={handleChange}
              required
            >
              {bloodGroups.map((group, index) => (
                <MenuItem key={index} value={group}>{group}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Organ to Donate"
              name="organ"
              value={form.organ}
              onChange={handleChange}
              required
            >
              {organs.map((org, index) => (
                <MenuItem key={index} value={org}>{org}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              {genders.map((g, index) => (
                <MenuItem key={index} value={g}>{g}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Organization"
              name="org"
              value={form.org}
              onChange={handleChange}
              required
            >
              {organizations.map((o, index) => (
                <MenuItem key={index} value={o}>{o}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Location" 
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  )
}
