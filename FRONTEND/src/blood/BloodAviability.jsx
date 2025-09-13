import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BloodAviability() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bloodUser = JSON.parse(sessionStorage.getItem('Blood_user'))
    const loggedInOrg = bloodUser?.name

    axios.get('http://localhost:2506/viewallblooddonors')
      .then((res) => {
        // Filter donors based on org name match
        const filteredDonors = res.data.filter((donor) => donor.org === loggedInOrg)
        setDonors(filteredDonors)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch donor data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container mt-5">
      <Typography variant="h4" className="text-center mb-4">
         Blood Donors Records
      </Typography>

      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : donors.length === 0 ? (
        <Typography variant="body1" align="center">
          No donors found for your organization.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead style={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Gender</strong></TableCell>
                <TableCell><strong>Blood Type</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Age</strong></TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map((donor, idx) => (
                <TableRow key={idx}>
                  <TableCell>{donor.fullName}</TableCell>
                  <TableCell>{donor.gender}</TableCell>
                  <TableCell>{donor.bloodType}</TableCell>
                  <TableCell>{donor.phoneno}</TableCell>
                  <TableCell>{donor.age}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
