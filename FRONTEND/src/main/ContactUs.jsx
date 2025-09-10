import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';

export default function ContactUs() {
  return (
    <Container maxWidth="md" className="py-5">
      <Box className="text-center mb-5">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Contact Us
        </Typography>
        <Typography variant="body1">
          We'd love to hear from you. Reach out to us via any of the options below.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" textAlign="center">
        <Grid item xs={12} md={4}>
          <Box>
            <LocationOn sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" className="mt-2">
              Our Office
            </Typography>
            <Typography variant="body2">
              123 LifeLine Street,<br />
              Health City, IN 500001
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Phone sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" className="mt-2">
              Phone
            </Typography>
            <Typography variant="body2">
              +91 98765 43210<br />
              +91 12345 67890
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Email sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" className="mt-2">
              Email
            </Typography>
            <Typography variant="body2">
              support@blood4life.org<br />
              info@blood4life.org
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box className="text-center mt-4">
        <Typography variant="body1" className="text-muted">
          We're here to help you 24/7. Reach out to us via phone, email, or visit our office.
        </Typography>
      </Box>
    </Container>
  );
}
