import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import { LocationOn } from '@mui/icons-material'

export default function BloodAviability() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:2506/viewallblooddonors') // Corrected API endpoint
      .then((res) => {
        setDonors(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch donor data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="w-100">
        <Typography variant="h4" className="text-center mb-4">
          Available Blood Donors
        </Typography>

        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {donors.map((donor, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card className="shadow-sm" sx={{ borderRadius: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" className="mb-2">
                      {donor.fullName}
                    </Typography>
                    <Typography><strong>Gender:</strong> {donor.gender}</Typography>
                    <Typography><strong>Blood Type:</strong> {donor.bloodType}</Typography>
                    <Typography><strong>Organization:</strong> {donor.org}</Typography>
                    <Typography><strong>Phone:</strong> {donor.phoneno}</Typography>
                    <Typography><strong>Location:</strong> {donor.location}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  )
}
