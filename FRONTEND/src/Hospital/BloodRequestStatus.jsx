import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Box, Button
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import config from './config';

const BASE_URL = `${config.url}`;

export default function BloodRequestStatus() {
  const hospitalUserJson = sessionStorage.getItem('Hospital_user');
  const hospitalUsername = hospitalUserJson ? JSON.parse(hospitalUserJson).username : null;

  const [activeRequests, setActiveRequests] = useState([]);
  const [closedRequests, setClosedRequests] = useState([]);

  useEffect(() => {
    if (hospitalUsername) {
      fetchRequests();
    }
  }, [hospitalUsername]);

  const fetchRequests = () => {
    axios.get(`${BASE_URL}/hospitalapi/blood-requests/hospital/${hospitalUsername}`)
      .then((res) => {
        // Separate active (Pending or Requires Action)
        const active = res.data.filter(req =>
          req.status === 'Pending' || req.status === 'Requires Action'
        );
        // Separate closed (Accepted or Rejected)
        const closed = res.data.filter(req =>
          req.status === 'Accepted' || req.status === 'Rejected'
        );

        const urgencyOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        
        const sortByUrgencyAndDate = (list) => {
          return list.sort((a, b) => {
            if (urgencyOrder[b.urgency] !== urgencyOrder[a.urgency]) {
              return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
            } else {
              return new Date(b.date) - new Date(a.date);
            }
          });
        };

        setActiveRequests(sortByUrgencyAndDate(active));
        setClosedRequests(sortByUrgencyAndDate(closed));
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blood request?')) return;
    try {
      await axios.delete(`${BASE_URL}/hospitalapi/blood-requests/${id}`);
      toast.success('Request deleted successfully');
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete request');
    }
  };

  const renderTable = (requests) => (
    <TableContainer component={Paper} className="shadow-sm" sx={{ mb: 4 }}>
      <Table>
        <TableHead className="table-dark">
          <TableRow>
            <TableCell><b>Patient Name</b></TableCell>
            <TableCell><b>Blood Group</b></TableCell>
            <TableCell><b>Units Needed</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Urgency</b></TableCell>
            <TableCell><b>Request Date</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{req.patientName}</TableCell>
              <TableCell>{req.bloodGroup}</TableCell>
              <TableCell>1</TableCell>
              <TableCell>{req.status}</TableCell>
              <TableCell>{req.urgency}</TableCell>
              <TableCell>{req.date}</TableCell>
              <TableCell>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  size="small" 
                  onClick={() => handleDelete(req.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="md" className="mt-5">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Blood Request Status
      </Typography>

      <Typography variant="h6" color="secondary" gutterBottom>
        Active Requests
      </Typography>
      {activeRequests.length > 0 
        ? renderTable(activeRequests) 
        : <Typography>No active requests.</Typography>
      }

      <Typography variant="h6" color="textSecondary" gutterBottom>
        Closed Requests
      </Typography>
      {closedRequests.length > 0
        ? renderTable(closedRequests)
        : <Typography>No closed requests.</Typography>
      }

      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
}
