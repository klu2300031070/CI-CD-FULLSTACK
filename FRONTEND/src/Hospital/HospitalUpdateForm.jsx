import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, Typography, MenuItem, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from './config'

const BASE_URL = `${config.url}/hospitalapi`

export default function HospitalUpdateForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [editable, setEditable] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const data = sessionStorage.getItem('Hospital_user')
    if (!data) {
      toast.error('No hospital data found! Please log in.')
      navigate('/hospital-login')
      return
    }
    setForm(JSON.parse(data))
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`${BASE_URL}/hospitals/${form.id}`, form)
      toast.success('Hospital updated successfully!')
      sessionStorage.setItem('Hospital_user', JSON.stringify(res.data || form))
      setEditable(false)
    } catch (err) {
      console.error(err)
      toast.error('Update failed. Try again.')
    }
  }

  const handleCancel = () => {
    const data = JSON.parse(sessionStorage.getItem('Hospital_user'))
    setForm(data)
    setEditable(false)
  }

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" className="mb-4 text-center">
          {editable ? "Update Hospital Information" : "Hospital Information"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Hospital ID" name="id" value={form.id || ''} disabled />
            <TextField label="Username" name="username" value={form.username || ''} disabled />
            <TextField label="Hospital Name" name="name" value={form.name || ''} disabled />
            <TextField label="Owner Name" name="ownerName" value={form.ownerName || ''} onChange={handleChange} disabled={!editable} required />
            <TextField select label="Hospital Type" name="type" value={form.type || ''} onChange={handleChange} disabled={!editable} required>
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="NGO">NGO</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Government">Government</MenuItem>
            </TextField>
            <TextField label="Address" name="address" value={form.address || ''} onChange={handleChange} multiline rows={3} disabled={!editable} required />
            <TextField label="Contact" name="contact" value={form.contact || ''} onChange={handleChange} disabled={!editable} required />
            <TextField label="Email" name="email" type="email" value={form.email || ''} onChange={handleChange} disabled={!editable} required />
            <TextField label="License No" name="licenseNo" value={form.licenseNo || ''} disabled />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password || ''}
              onChange={handleChange}
              disabled={!editable}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              required
            />

            {editable ? (
              <Box display="flex" gap={2}>
                <Button type="submit" variant="contained" color="primary">Update</Button>
                <Button type="button" onClick={handleCancel} variant="outlined" color="secondary">Cancel</Button>
              </Box>
            ) : (
              <Button type="button" onClick={() => setEditable(true)} variant="outlined" color="secondary">
                Edit
              </Button>
            )}
          </Box>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  )
}
