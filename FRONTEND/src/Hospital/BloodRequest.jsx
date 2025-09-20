import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField, MenuItem,
  Button, Box, Container
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from './config';
import { useNavigate } from 'react-router-dom';

const BASE_URL = `${config.url}`;

export default function BloodRequest() {
  const [form, setForm] = useState({
    bloodGroup: '',
    unitsNeeded: '',
    urgency: 'LOW',
    patientName: '',
    patientAge: '',
    patientInfo: ''
  });

  const hospitalUserJson = sessionStorage.getItem('Hospital_user');
  const username = hospitalUserJson ? JSON.parse(hospitalUserJson).username : null;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: (name === 'patientAge' || name === 'unitsNeeded') ? Number(value) : value
    }));
  };

  // Function to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error('Hospital user not logged in or session expired.');
      return;
    }

    const payload = {
      ...form,
      hospitalUsername: username,
      date: getCurrentDate(), // Add current date automatically
      status: 'Pending'       // Set status as Pending by default
    };

    try {
      await axios.post(`${BASE_URL}/hospitalapi/blood-requests`, payload);
      toast.success('Blood Request Submitted Successfully');

      // Reset form
      setForm({
        bloodGroup: '',
        unitsNeeded: '',
        urgency: 'LOW',
        patientName: '',
        patientAge: '',
        patientInfo: ''
      });

      // Redirect to blood request status page
      navigate('/blood-request-status');

    } catch (error) {
      console.error(error);
      toast.error('Failed to submit blood request');
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5 mb-5">
      <Card className="shadow-sm p-4">
        <Typography variant="h4" className="text-center text-primary mb-4">
          Blood Request Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              select
              fullWidth
              label="Select Blood Group"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
            >
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              type="number"
              label="Units Needed"
              name="unitsNeeded"
              value={form.unitsNeeded}
              onChange={handleChange}
              required
              inputProps={{ min: 1 }}
            />
          </Box>

          <Box mb={3}>
            <TextField
              select
              fullWidth
              label="Urgency Level"
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              required
            >
              {['LOW', 'MEDIUM', 'HIGH'].map(level => (
                <MenuItem key={level} value={level}>{level}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              type="number"
              label="Patient Age"
              name="patientAge"
              value={form.patientAge}
              onChange={handleChange}
              required
              inputProps={{ min: 0 }}
            />
          </Box>

          <Box mb={4}>
            <TextField
              fullWidth
              label="Additional Patient Info"
              name="patientInfo"
              value={form.patientInfo}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Box>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit Request
          </Button>
        </form>
      </Card>

      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
}
