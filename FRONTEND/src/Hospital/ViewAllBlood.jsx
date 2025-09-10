import React, { useState } from 'react'
import axios from 'axios'
import { Container, FormControl, InputLabel, MenuItem, Select, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ViewAllBlood() {
  const [bloodType, setBloodType] = useState('')
  const [bloodData, setBloodData] = useState([])

  const bloodOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  // Handle blood type selection and fetch data from backend
  const handleChange = async (event) => {
    const selectedType = event.target.value
    setBloodType(selectedType)

    try {
      // Make the GET request to the backend with bloodType as query parameter
      const response = await axios.get(`http://localhost:2506/viewallbyblood`, {
        params: {
          bloodType: selectedType
        }
      })
      setBloodData(response.data)
    } catch (error) {
      console.error('Error fetching blood data:', error)
      setBloodData([])  // Clear data on error
    }
  }

  return (
    <Container maxWidth="sm" className="mt-5 mb-5">
      <Typography variant="h4" className="text-center mb-4 text-primary">
        View Blood Availability
      </Typography>

      <Box className="mb-4">
        <FormControl fullWidth>
          <InputLabel id="blood-type-label">Select Blood Type</InputLabel>
          <Select
            labelId="blood-type-label"
            value={bloodType}
            label="Select Blood Type"
            onChange={handleChange}
          >
            {bloodOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Display the blood donor data in a table */}
      {bloodData.length > 0 ? (
        <TableContainer component={Paper} className="shadow">
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#1976d2' }}>
                <TableCell style={{ color: '#fff' }}>Blood Bank Name</TableCell>
                <TableCell style={{ color: '#fff' }}>Name</TableCell>
                <TableCell style={{ color: '#fff' }}>Phone</TableCell>
                <TableCell style={{ color: '#fff' }}>Location</TableCell> {/* New Location column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {bloodData.map((bank, index) => (
                <TableRow key={index}>
                  <TableCell>{bank.org}</TableCell>
                  <TableCell>{bank.fullName}</TableCell>
                  <TableCell>{bank.phoneno}</TableCell>
                  <TableCell>{bank.location}</TableCell> {/* Location data */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : bloodType ? (
        <Typography className="mt-4 text-danger">No data available for {bloodType}</Typography>
      ) : null}
    </Container>
  )
}
