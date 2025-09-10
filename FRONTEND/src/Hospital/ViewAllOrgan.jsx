import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ViewAllOrgan() {
  const [bloodType, setBloodType] = useState('')
  const [organType, setOrganType] = useState('')
  const [data, setData] = useState([])

  const handleSearch = async () => {
    if (!bloodType || !organType) {
      alert('Please select both blood type and organ type.')
      return
    }

    try {
      const response = await axios.get(`http://localhost:2506/viewallorgansbybloodandorgan`, {
        params: {
          bloodType,
          organ: organType,
        },
      })
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setData([])
    }
  }

  return (
    <Box className="container mt-5" style={{ maxWidth: '800px' }}>
      <Card className="shadow">
        <CardContent>
          <Typography variant="h5" className="text-center mb-4 text-primary">
            View Available Organs in Blood Banks
          </Typography>

          <Box className="row mb-4">
            <div className="col-md-6 mb-3">
              <FormControl fullWidth>
                <InputLabel>Blood Type</InputLabel>
                <Select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-6 mb-3">
              <FormControl fullWidth>
                <InputLabel>Organ Type</InputLabel>
                <Select value={organType} onChange={(e) => setOrganType(e.target.value)}>
                  <MenuItem value="Kidney">Kidney</MenuItem>
                  <MenuItem value="Heart">Heart</MenuItem>
                  <MenuItem value="Liver">Liver</MenuItem>
                  <MenuItem value="Lungs">Lungs</MenuItem>
                  <MenuItem value="Pancreas">Pancreas</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>

          <Box className="text-center mb-4">
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          {data.length > 0 ? (
            <Table striped bordered hover className="table table-hover">
              <TableHead className="thead-dark">
                <TableRow>
                  <TableCell><strong>Bank Name</strong></TableCell>
                  <TableCell><strong>Organ</strong></TableCell>
                  <TableCell><strong>Blood Type</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Mobile</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.org}</TableCell>
                    <TableCell>{item.organ}</TableCell>
                    <TableCell>{item.bloodType}</TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.phoneno}</TableCell>
                    <TableCell>{item.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography className="text-center text-muted mt-3">
              No data to display. Please search above.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
