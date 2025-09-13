import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Hospitals', count: 120 },
  { name: 'Blood Banks', count: 80 },
  { name: 'Donors', count: 150 },
];

export default function About() {
  return (
    <div className="container mt-5">
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" className="mb-3 text-center text-primary fw-bold">
            About Our Website
          </Typography>
          <Typography variant="body1" className="mb-4">
            <strong>Blood 4 Life</strong> is a unified platform that bridges the gap between
            hospitals, blood banks, organ banks, and individuals. Our goal is to make the
            process of finding and donating blood or organs fast, reliable, and efficient.
            We ensure transparency and quick access through our system to save lives at
            critical moments.
          </Typography>

          <Box className="mb-4">
            <Typography variant="h6" className="text-center mb-3 text-success">
              Our Current Partnerships and Users (Overview)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <Typography variant="body2" className="text-muted">
            We continue to grow and evolve with the aim of making medical resource
            accessibility faster and more transparent for everyone. Your support helps us
            save more lives.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
