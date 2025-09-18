import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config';

const BASE_URL = `${config.url}`;

export default function BloodAvailability() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/blood-inventory`)
      .then((res) => setInventory(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBloodGroupChange = (e) => {
    const selectedGroup = e.target.value;
    setSelectedBloodGroup(selectedGroup);

    const filtered = inventory.filter(item => item.bloodGroup === selectedGroup);
    setFilteredInventory(filtered);
  };

  return (
    <Container maxWidth="md" className="mt-5">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Blood Inventory Across Blood Banks
      </Typography>

      <Box my={4}>
        <FormControl fullWidth variant="outlined" className="mb-4">
          <InputLabel>Select Blood Group</InputLabel>
          <Select
            value={selectedBloodGroup}
            onChange={handleBloodGroupChange}
            label="Select Blood Group"
          >
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
              <MenuItem key={group} value={group}>{group}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedBloodGroup && filteredInventory.length > 0 ? (
          <TableContainer component={Paper} className="shadow-sm">
            <Table>
              <TableHead className="table-dark">
                <TableRow>
                  <TableCell><b>Blood Bank Name</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Phone Number</b></TableCell>
                  <TableCell><b>Available Units</b></TableCell>
                  <TableCell><b>Expiry Date</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.bloodBankName}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.availableUnits}</TableCell>
                    <TableCell>{item.expiryDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : selectedBloodGroup ? (
          <Typography variant="h6" align="center" className="text-muted mt-4">
            No blood inventory available for {selectedBloodGroup}
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
}

