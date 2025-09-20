import React, { useState } from 'react';
import {
  Card, Typography, TextField, MenuItem,
  Button, Box, Container
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from './config';

const BASE_URL = `${config.url}`;
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const URGENCY_LEVELS = ['LOW', 'MEDIUM', 'HIGH'];

export default function BloodRequest() {
  const [form, setForm] = useState({
    bloodGroup: '',
    unitsNeeded: '',
    urgency: 'LOW',
    patientName: '',
    patientAge: '',
    patientInfo: ''
  });

  const navigate = useNavigate();
  const hospitalUser = JSON.parse(sessionStorage.getItem('Hospital_user') || '{}');
  const username = hospitalUser.username || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['patientAge', 'unitsNeeded'].includes(name) ? Number(value) : value
    }));
  };

  const getCurrentDate = () =>
    new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error('Hospital user not logged in or session expired.');
      return;
    }

    const payload = {
      ...form,
      hospitalUsername: username,
      date: getCurrentDate(),
      status: 'Pending'
    };

    try {
      await axios.post(`${BASE_URL}/hospitalapi/blood-requests`, payload);
      toast.success('Blood Request Submitted Successfully');
      setForm({ bloodGroup: '', unitsNeeded: '', urgency: 'LOW', patientName: '', patientAge: '', patientInfo: '' });
      navigate('/blood-request-status');
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit blood request');
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5 mb-5">
      <Card className="shadow-sm p-4">
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Blood Request Form
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Blood Group */}
          <Box mb={3}>
            <TextField
              select fullWidth required
              label="Select Blood Group"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
            >
              {BLOOD_GROUPS.map(group => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Units Needed */}
          <Box mb={3}>
            <TextField
              fullWidth required type="number"
              label="Units Needed"
              name="unitsNeeded"
              value={form.unitsNeeded}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Box>

          {/* Urgency */}
          <Box mb={3}>
            <TextField
              select fullWidth required
              label="Urgency Level"
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
            >
              {URGENCY_LEVELS.map(level => (
                <MenuItem key={level} value={level}>{level}</MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Patient Name */}
          <Box mb={3}>
            <TextField
              fullWidth required
              label="Patient Name"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
            />
          </Box>

          {/* Patient Age */}
          <Box mb={3}>
            <TextField
              fullWidth required type="number"
              label="Patient Age"
              name="patientAge"
              value={form.patientAge}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Box>

          {/* Patient Info */}
          <Box mb={4}>
            <TextField
              fullWidth multiline rows={3}
              label="Additional Patient Info"
              name="patientInfo"
              value={form.patientInfo}
              onChange={handleChange}
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
