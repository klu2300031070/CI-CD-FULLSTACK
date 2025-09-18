import { Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

import About from './About';
import Contact from './ContactUs';
import BloodLogin from './../blood/BloodLogin';
import OrganLogin from './../organs/OrganLogin';
import HospitalRegistrationForm from '../Hospital/HospitalRegistrationForm';
import HospitalLogin from '../Hospital/HospitalLogin';
import BloodBankRegistration from '../blood/bloodbankregistration';
export default function MainNavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Blood 4 Life
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              About
            </Button>
            <Button
              color="inherit"
              onClick={handleMenuClick}
              endIcon={<ArrowDropDownIcon />}
            >
              Login
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem component={Link} to="/hospital-login" onClick={handleClose}>
                Hospital
              </MenuItem>
              <MenuItem component={Link} to="/bloodbank-login" onClick={handleClose}>
                Blood Bank
              </MenuItem>
              <MenuItem component={Link} to="/organbank-login" onClick={handleClose}>
                Admin
              </MenuItem>
            </Menu>
            <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/hospital-login" element={<HospitalLogin/>} />
        <Route path="/bloodbank-login" element={<BloodLogin />} />
        <Route path="/organbank-login" element={<OrganLogin />} />
        <Route path="/hospital-registration" element={<HospitalRegistrationForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/bloodbankregister' element={<BloodBankRegistration/>} />
      </Routes>
    </Box>
  );
}
