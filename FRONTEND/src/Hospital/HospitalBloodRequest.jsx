import React, { useState, useEffect } from 'react'
import {
  Card, CardContent, Typography, Button,
  TextField, MenuItem, Box, Container
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

export default function HospitalBloodRequest() {
  const [hospitalName, setHospitalName] = useState('') // State for hospital name
  const [bloodGroup, setBloodGroup] = useState('')
  const [urgency, setUrgency] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const nameFromStorage = sessionStorage.getItem('hospitalName') || 'Unknown Hospital'
    setHospitalName(nameFromStorage)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!bloodGroup || !urgency || !date) {
      toast.error('Please fill all fields')
      return
    }

    const payload = {
      hospital: hospitalName,
      bloodtype: bloodGroup,
      urgency,
      status: "Pending",
      date:date
    }

    try {
      await axios.post('http://localhost:2506/addbloodrequest', payload)
      toast.success('Blood Request Submitted Successfully')
      setBloodGroup('')
      setUrgency('')
      setDate('')
    } catch (error) {
      console.error('Error submitting request:', error)
      toast.error('Failed to submit request')
    }
  }

  return (
    <Container maxWidth="sm" className="mt-5 mb-5">
      <Typography variant="h4" className="text-center mb-4 text-primary">
        Submit Blood Request
      </Typography>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <Box mb={3}>
          <TextField
            label="Hospital Name"
            fullWidth
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}  // Make hospital name editable
            variant="outlined"
          />
        </Box>

        <Box mb={3}>
          <TextField
            select
            label="Select Blood Group"
            fullWidth
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
              <MenuItem key={group} value={group}>{group}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Box mb={3}>
          <TextField
            select
            label="Urgency Level"
            fullWidth
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            {['Low', 'Medium', 'High', 'Critical'].map(level => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Box mb={4}>
          <TextField
            label="Required Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Request
        </Button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  )
}
