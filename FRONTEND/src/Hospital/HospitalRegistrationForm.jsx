import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';
import config from '../config';


const BASE_URL = `${config.url}`;
export default function HospitalRegistrationForm() {
  const [form, setForm] = useState({
    username: '',
    name: '',
    address: '',
    contact: '',
    email: '',
    licenseNo: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/register`, form);
      alert('Hospital registered successfully');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Username or email might already be taken.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hospital Registration</h2>
      
      <input
        type="text"
        name="username"
        placeholder="Unique Username"
        value={form.username}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Hospital Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      ></textarea>

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={form.contact}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="licenseNo"
        placeholder="License Number"
        value={form.licenseNo}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Register Hospital</button>
    </form>
  );
}
