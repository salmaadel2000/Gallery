import React, { useState } from 'react';
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import "./AuthComponent.scss";

const AuthComponent = ({ isSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  // Method to validate email format using regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Method to validate password length
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handler to update state with form input changes and clear errors
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    setError('');
    setEmailError('');
    setPasswordError('');
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email and password
    const emailError = !validateEmail(email) ? 'Invalid email format' : '';
    const passwordError = !validatePassword(password) ? 'Password must be at least 6 characters' : '';

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    try {
      // Sign in or sign up based on the prop isSignIn
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Store login status in localStorage and redirect to home
      localStorage.setItem('isLoggedIn', 'true');
      setRedirectToHome(true);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  // Redirect to home if sign in/sign up is successful
  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  return (
    <Container maxWidth="xs">
      <Box className="auth-box">
        <Typography variant="h5" component="h1" style={{ color: 'white' }}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleChange(setEmail)}
            fullWidth
            margin="normal"
            InputProps={{ style: { color: 'white', borderColor: 'white' } }}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange(setPassword)}
            fullWidth
            margin="normal"
            InputProps={{ style: { color: 'white', borderColor: 'white' } }}
            error={!!passwordError}
            helperText={passwordError}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AuthComponent;
