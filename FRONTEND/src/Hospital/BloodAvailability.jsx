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
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  const handleBloodGroupChange = (e) => {
    const selectedGroup = e.target.value;
    setSelectedBloodGroup(selectedGroup);

    if (selectedGroup) {
      axios.get(`${BASE_URL}/hospitalapi/blood-availability/${selectedGroup}`)
        .then((res) => setFilteredInventory(res.data))
        .catch((err) => {
          console.error(err);
          setFilteredInventory([]); // fallback if error
        });
    }
  };

  return (
    <Container maxWidth="lg" className="mt-5">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Blood Availability by Blood Group
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
                  <TableCell><b>Blood Bank (Org)</b></TableCell>
                  <TableCell><b>Blood Group</b></TableCell>
                  <TableCell><b>Available Units</b></TableCell>
                  <TableCell><b>Used Units</b></TableCell>
                  <TableCell><b>Donated Units</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.org}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.aunits}</TableCell>
                    <TableCell>{item.usedunits}</TableCell>
                    <TableCell>{item.donatedunits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : selectedBloodGroup ? (
          <Typography variant="h6" align="center" className="text-muted mt-4">
            No blood banks available for {selectedBloodGroup}
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
}
