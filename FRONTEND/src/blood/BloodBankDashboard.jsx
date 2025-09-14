import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, Grid, Button, CircularProgress
} from '@mui/material';

export default function BloodBankDashboard() {
  const [bloodData, setBloodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchBloodData();
}, []);

const fetchBloodData = () => {
  axios.get('http://localhost:2506/viewallblooddata')
    .then((res) => {
      const bloodUser = JSON.parse(sessionStorage.getItem('Blood_user'));
      const orgName = bloodUser?.name;

     
      const filteredData = res.data.filter((item) => item.org === orgName);

      setBloodData(filteredData);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Failed to fetch blood data:', err);
      setLoading(false);
    });
};

  const handleDecrement = (type) => {
    axios.put(`http://localhost:2506/decrement/${type}`)
      .then((res) => {
       
        const updatedData = bloodData.map((item) =>
          item.type === type ? res.data : item
        );
        setBloodData(updatedData);
      })
      .catch((err) => {
        console.error(`Failed to decrement blood unit for ${type}:`, err);
      });
  };

  return (
    <div className="container py-5">
      <Typography variant="h4" className="text-center mb-4">
        Blood Stock Availability
      </Typography>

      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {bloodData.map((data, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ borderRadius: 3, p: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Blood Type: {data.type}
                  </Typography>
                 
                  <Typography><strong>Donated Units:</strong> {data.donatedunits}</Typography>
                  <Typography><strong>Used Units:</strong> {data.usedunits}</Typography>
                  <Typography><strong>Available Units:</strong> {data.aunits}</Typography>

                  <Button
                    variant="contained"
                    color="error"
                    className="mt-3"
                    onClick={() => handleDecrement(data.type)}
                    disabled={data.aunits <= 0}
                  >
                    Decrement Unit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
