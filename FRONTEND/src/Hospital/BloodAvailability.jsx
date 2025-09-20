import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Box,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config';

const BASE_URL = `${config.url}`;
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function BloodAvailability() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [inventory, setInventory] = useState([]);

  const fetchAvailability = async (group) => {
    try {
      const res = await axios.get(`${BASE_URL}/hospitalapi/blood-availability/${group}`);
      setInventory(res.data);
    } catch (error) {
      console.error(error);
      setInventory([]);
    }
  };

  const handleChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    if (group) fetchAvailability(group);
  };

  return (
    <Container maxWidth="lg" className="mt-5">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Blood Availability by Blood Group
      </Typography>

      <Box my={4}>
        {/* Dropdown */}
        <FormControl fullWidth variant="outlined" className="mb-4">
          <InputLabel>Select Blood Group</InputLabel>
          <Select
            value={selectedGroup}
            onChange={handleChange}
            label="Select Blood Group"
          >
            {BLOOD_GROUPS.map(group => (
              <MenuItem key={group} value={group}>{group}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Table or Message */}
        {selectedGroup && (
          inventory.length > 0 ? (
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
                  {inventory.map((item) => (
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
          ) : (
            <Typography variant="h6" align="center" className="text-muted mt-4">
              No blood banks available for {selectedGroup}
            </Typography>
          )
        )}
      </Box>
    </Container>
  );
}
