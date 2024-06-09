import React, { useState, useEffect } from 'react';
import './Navbar.scss'; 
import { NavLink, useLocation } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  const handleNavLinkClick = (route) => {
    setActiveRoute(route);
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h4" className="title">
          Gallery
        </Typography>
        <NavLink
          to="/home"
          className={`link ${activeRoute === '/home' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('/home')}
        >
          <Button color="inherit">Home</Button>
        </NavLink>
        {!user ? (
          <>
            <NavLink
              to="/login"
              className={`link ${activeRoute === '/login' ? 'active' : ''}`}
              onClick={() => handleNavLinkClick('/login')}
            >
              <Button color="inherit">Login</Button>
            </NavLink>
            <NavLink
              to="/"
              className={`link ${activeRoute === '/' ? 'active' : ''}`}
              onClick={() => handleNavLinkClick('/')}
            >
              <Button color="inherit">Register</Button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/favorite"
              className={`link ${activeRoute === '/favorite' ? 'active' : ''}`}
              onClick={() => handleNavLinkClick('/favorite')}
            >
              <Button color="inherit">Favorite</Button>
            </NavLink>
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
