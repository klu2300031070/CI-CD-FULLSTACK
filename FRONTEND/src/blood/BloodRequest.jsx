import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from './config';

export default function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const bloodUser = JSON.parse(sessionStorage.getItem('Blood_user'));

  useEffect(() => {
    if (bloodUser?.name) {
      fetchPendingRequests();
      fetchAcceptedRequests();
    } else {
      toast.error('Blood user not found in session storage');
    }
  }, []);
  const baseUrl = `${config.url}`;
  const fetchPendingRequests = () => {
    axios
      .get(`${baseUrl}/viewallrequests`)
      .then((res) => {
        const pendingRequests = res.data.filter(
          (req) => req.status?.toUpperCase() === 'PENDING'
        );
        setRequests(pendingRequests);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blood requests:', err);
        toast.error('Failed to load blood requests');
        setLoading(false);
      });
  };

  const fetchAcceptedRequests = () => {
    axios
      .get(`${baseUrl}/viewallrequests`)
      .then((res) => {
        const accepted = res.data.filter(
          (req) => req.status?.toUpperCase() === 'ACCEPTED'
        );
        setAcceptedRequests(accepted);
      })
      .catch((err) => {
        console.error('Failed to fetch accepted requests:', err);
      });
  };

  const handleAccept = async (id) => {
    try {
      const payload = {
        id: id,
        status: 'ACCEPTED',
        acceptedOrg: bloodUser?.name,
      };

      const res = await axios.put(
        `${baseUrl}/updatebloodstatus`,
        payload
      );

      toast.success(res.data || `Request ID ${id} accepted`);

      const acceptedReq = requests.find((req) => req.id === id);

      setRequests((prev) => prev.filter((req) => req.id !== id));

      setAcceptedRequests((prev) => [
        ...prev,
        { ...acceptedReq, status: 'ACCEPTED', acceptedOrg: bloodUser.name },
      ]);
    } catch (err) {
      console.error('Failed to accept request:', err);

      if (err.response && err.response.status === 400) {
        toast.error('Insufficient blood units available for this type.');
      } else if (err.response && err.response.status === 404) {
        toast.error('Blood type data not found.');
      } else {
        toast.error('Failed to accept request. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <Typography variant="h4" className="text-center mb-4">
        Pending Blood Requests
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : requests.length === 0 ? (
        <Typography className="text-center">
          No pending requests found.
        </Typography>
      ) : (
        <div className="row">
          {requests.map((req) => (
            <div className="col-md-6 col-lg-4 mb-4" key={req.id}>
              <Card className="shadow h-100">
                <CardContent>
                  <Typography variant="h6" className="mb-2 text-primary">
                    {req.hospitalUsername} 
                  </Typography>
                  <Typography>
                    Blood Needed: <strong>{req.bloodGroup}</strong>
                  </Typography>
                  <Typography>
                    Units: <strong>{req.unitsNeeded}</strong>
                  </Typography>
                  <Typography>
                    Urgency: <strong>{req.urgency}</strong>
                  </Typography>
                  <Typography>
                    Date: <strong>{req.date}</strong>
                  </Typography>
                  <Typography>
                    Patient: <strong>{req.patientName} ({req.patientAge} yrs)</strong>
                  </Typography>

                  <Box mt={3} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(req.id)}
                    >
                      Accept
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Typography variant="h5" className="mt-5 mb-3 text-center">
        Accepted Requests by Your Blood Bank
      </Typography>

      {acceptedRequests.length === 0 ? (
        <Typography className="text-center">
          No accepted requests yet.
        </Typography>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Urgency</th>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Hospital</th>
              <th>Accepted By</th>
            </tr>
          </thead>
          <tbody>
            {acceptedRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.date}</td>
                <td>{req.urgency}</td>
                <td>{req.bloodGroup}</td> 
                <td>{req.unitsNeeded}</td> 
                <td>{req.hospitalUsername}</td> 
                <td>{req.acceptedOrg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
