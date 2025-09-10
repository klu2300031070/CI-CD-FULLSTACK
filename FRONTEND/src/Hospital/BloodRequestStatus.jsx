import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
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
  Box
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = `${config.url}`;

export default function BloodRequestStatus() {
  const [requests, setRequests] = useState([]);
  const hospitalId = 1;

  useEffect(() => {
    axios.get(`${BASE_URL}/blood-request/status/${hospitalId}`)
      .then((res) => {
        // Filter requests that need action
        const filtered = res.data.filter(req => req.status === 'Pending' || req.status === 'Requires Action');

        // Sort by urgency: HIGH > MEDIUM > LOW
        const urgencyOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        filtered.sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);

        setRequests(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container maxWidth="md" className="mt-5">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Blood Request Status
      </Typography>

      <Box my={4}>
        <TableContainer component={Paper} className="shadow-sm">
          <Table>
            <TableHead className="table-dark">
              <TableRow>
                <TableCell><b>Patient Name</b></TableCell>
                <TableCell><b>Blood Group</b></TableCell>
                <TableCell><b>Units Needed</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Urgency</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.patientName}</TableCell>
                  <TableCell>{req.bloodGroup}</TableCell>
                  <TableCell>{req.unitsNeeded}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell>{req.urgency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

