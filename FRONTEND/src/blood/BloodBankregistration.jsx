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

  const [passwordTouched, setPasswordTouched] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (name === 'password') setPasswordTouched(true)
  }

  // Password validation logic
  const passwordValidations = {
    hasSpecialChar: /[^A-Za-z0-9 ]/.test(form.password),
    hasMinLength: form.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(form.password),
    hasNumber: /\d/.test(form.password),
  }

  const isPasswordValid = Object.values(passwordValidations).every(Boolean)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isPasswordValid) {
      toast.error('Password does not meet the criteria.')
      return
    }

    try {
      const res = await axios.post('http://localhost:2506/registerbloodbank', form)
      toast.success(res)

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
              onBlur={() => setPasswordTouched(true)}
              required
            />

            {/* Password Validation Feedback */}
            {passwordTouched && (
              <Box>
                <Typography variant="body2" style={{ color: passwordValidations.hasSpecialChar ? 'green' : 'red' }}>
                  {passwordValidations.hasSpecialChar ? '✅ Contains Special Character' : '❌ Should Contain Special Character'}
                </Typography>
                <Typography variant="body2" style={{ color: passwordValidations.hasMinLength ? 'green' : 'red' }}>
                  {passwordValidations.hasMinLength ? '✅ Minimum Length 8' : '❌ Minimum Length Should be 8'}
                </Typography>
                <Typography variant="body2" style={{ color: passwordValidations.hasUpperCase ? 'green' : 'red' }}>
                  {passwordValidations.hasUpperCase ? '✅ Contains Capital Letter' : '❌ Should Contain Capital Letter'}
                </Typography>
                <Typography variant="body2" style={{ color: passwordValidations.hasNumber ? 'green' : 'red' }}>
                  {passwordValidations.hasNumber ? '✅ Contains Number' : '❌ Should Contain a Number'}
                </Typography>
              </Box>
            )}

            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />

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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isPasswordValid}
            >
              Register
            </Button>
          </Box>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  )
}
