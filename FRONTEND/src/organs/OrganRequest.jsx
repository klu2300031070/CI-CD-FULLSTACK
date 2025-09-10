import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

export default function OrganRequest() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    axios.get('http://localhost:2506/viewallorganrequests')
      .then(response => setRequests(response.data))
      .catch(() => toast.error('Failed to fetch organ requests'))
  }, [])

  const handleDecision = (requestObj, decision) => {
    const updatedRequest = {
      ...requestObj,
      status: decision === 'accept' ? 'accepted' : 'rejected',
    }

    axios.put('http://localhost:2506/updateorganstatus', updatedRequest)
      .then(() => {
        toast.success(`Request ${updatedRequest.status} for ID: ${updatedRequest.id}`)
        setRequests(prev => prev.filter(req => req.id !== updatedRequest.id))
      })
      .catch(() => toast.error('Failed to update status'))
  }

  return (
    <div className="container mt-5 mb-5">
      <Typography variant="h4" className="text-center mb-4">
        Organ Requests from Hospitals
      </Typography>

      <div className="row">
        {requests.map(req => (
          <div className="col-md-6 col-lg-4 mb-4" key={req.id}>
            <Card className="shadow h-100">
              <CardContent>
                <Typography variant="h6" className="mb-2 text-primary">
                  {req.hospital}
                </Typography>
                <Typography>Organ Needed: <strong>{req.organ}</strong></Typography>
                <Typography>Urgency: <strong>{req.urgency}</strong></Typography>
                <Typography>Blood Type: {req.bloodtype}</Typography>

                <Box mt={3} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleDecision(req, 'accept')}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDecision(req, 'reject')}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}
