import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Navbar.scss';

const Navbar = ({ user, onLogout }) => {
  return (
    // Navbar component using Material-UI AppBar
    <AppBar position="static" className="navbar">
      <Toolbar>
        {/* Title */}
        <Typography variant="h4" className="title">
          Gallery
        </Typography>
        {/* Home NavLink */}
        <NavLink to="/home" className="link" activeClassName="active">
          <Button color="inherit">Home</Button>
        </NavLink>
        {/* Conditionally rendering Login and Register NavLink */}
        {!user ? ( // Using ternary operator to check user authentication
          <>
            {/* Login NavLink */}
            <NavLink to="/login" className="link" activeClassName="active">
              <Button color="inherit">Login</Button>
            </NavLink>
            {/* Register NavLink */}
            <NavLink to="/" className="link" activeClassName="active">
              <Button color="inherit">Register</Button>
            </NavLink>
          </>
        ) : (
          // Conditionally rendering Favorite NavLink and Logout Button if user is authenticated
          <>
            {/* Favorite NavLink */}
            <NavLink to="/favorite" className="link" activeClassName="active">
              <Button color="inherit">Favorite</Button>
            </NavLink>
            {/* Logout Button */}
            <Button color="inherit" className="button" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
