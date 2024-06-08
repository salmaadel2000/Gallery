import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.scss'; // Import the associated SCSS file

const Footer = () => {
  return (
    <Box className="footer"> {/* Container for the entire footer */}
      {/* Footer content section */}
      <Box className="footer-content">
        {/* Contact section */}
        <Box className="footer-section">
          <Typography variant="h6">Contact Us</Typography> {/* Heading */}
          <Typography variant="body2">
            Email: support@example.com {/* Contact email */}
          </Typography>
          <Typography variant="body2">
            Phone: +1 234 567 890 {/* Contact phone */}
          </Typography>
        </Box>
        {/* Follow Us section */}
        <Box className="footer-section">
          <Typography variant="h6">Follow Us</Typography> {/* Heading */}
          <Box className="social-links"> {/* Social media links */}
            <Link href="#" color="inherit">Facebook</Link>
            <Link href="#" color="inherit">Twitter</Link>
            <Link href="#" color="inherit">Instagram</Link>
          </Box>
        </Box>
        {/* Quick Links section */}
        <Box className="footer-section">
          <Typography variant="h6">Quick Links</Typography> {/* Heading */}
          <Box className="quick-links"> {/* Quick links */}
            <Link href="#" color="inherit">Home</Link>
            <Link href="#" color="inherit">About</Link>
            <Link href="#" color="inherit">Services</Link>
            <Link href="#" color="inherit">Contact</Link>
          </Box>
        </Box>
      </Box>
      {/* Footer bottom section */}
      <Typography variant="body2" color="inherit" className="footer-bottom">
        &copy; {new Date().getFullYear()} All rights reserved. {/* Copyright */}
      </Typography>
    </Box>
  );
};

export default Footer;
