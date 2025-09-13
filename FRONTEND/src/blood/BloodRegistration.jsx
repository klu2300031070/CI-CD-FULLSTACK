import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BloodRegistration() {
  // ✅ Get organization name from session storage
  const storedUser = JSON.parse(sessionStorage.getItem('Blood_user'));
  const orgFromSession = storedUser?.name || '';

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    contact: '',
    organization: orgFromSession, // ✅ Prefill from session storage
    location: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: form.name,
      phoneno: form.contact,
      bloodType: form.bloodGroup,
      gender: form.gender,
      org: form.organization, // ✅ Send organization from session
      age: form.age,
      location: form.location
    };

    try {
      const res = await axios.post('http://localhost:2506/registerblooddonor', payload);
      toast.success('Donor record added successful!');
      console.log(res.data);

      // Reset form (except organization)
      setForm({
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        contact: '',
        organization: orgFromSession,
        location: ''
      });

      // Optional: redirect
      navigate('/bloodregistrartion');
    } catch (err) {
      console.error(err);
      toast.error('Failed to register donor.');
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const genders = ['Male', 'Female', 'Other'];

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" className="mb-4 text-center">
          Blood Donor Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
            />

            <TextField
              select
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              {genders.map((g, idx) => (
                <MenuItem key={idx} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Blood Group"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
            >
              {bloodGroups.map((b, idx) => (
                <MenuItem key={idx} value={b}>
                  {b}
                </MenuItem>
              ))}
            </TextField>

            {/* ✅ Disabled Organization Field (Auto-filled) */}
            <TextField
              label="Organization"
              name="organization"
              value={form.organization}
              disabled
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
  );
}
