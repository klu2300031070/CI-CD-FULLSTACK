import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

export default function OrganRequests() {
  const [requests, setRequests] = useState([])

  // Fetch pending blood requests
  useEffect(() => {
    axios.get('http://localhost:2506/viewallbloodrequests')
      .then((res) => setRequests(res.data))
      .catch((err) => {
        console.error('Failed to fetch blood requests:', err)
        toast.error('Failed to load requests')
      })
  }, [])

  const handleAccept = async (id) => {
    try {
      const payload = {
        id: id,
        status: "Accepted"
      }
      await axios.put('http://localhost:2506/updatebloodstatus', payload)
      toast.success(`Request ID ${id} marked as Accepted`)
      setRequests(prev => prev.filter(req => req.id !== id))
    } catch (err) {
      console.error('Status update failed:', err)
      toast.error('Failed to accept request')
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <Typography variant="h4" className="text-center mb-4">
        Pending Blood Requests
      </Typography>

      <div className="row">
        {requests.map(req => (
          <div className="col-md-6 col-lg-4 mb-4" key={req.id}>
            <Card className="shadow h-100">
              <CardContent>
                <Typography variant="h6" className="mb-2 text-primary">
                  {req.hospital}
                </Typography>
                <Typography>Blood Needed: <strong>{req.bloodtype}</strong></Typography>
                <Typography>Urgency: <strong>{req.urgency}</strong></Typography>

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

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}
