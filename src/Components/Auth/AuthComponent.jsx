import React, { Component } from 'react';
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import "./AuthComponent.scss";

class AuthComponent extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    emailError: '',
    passwordError: '',
    redirectToHome: false
  };

  // Method to validate email format using regex
  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Method to validate password length
  validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handler to update state with form input changes and clear errors
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: '', emailError: '', passwordError: '' });
  };

  // Handler for form submission
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { isSignIn } = this.props;

    // Validate email and password
    const emailError = !this.validateEmail(email) ? 'Invalid email format' : '';
    const passwordError = !this.validatePassword(password) ? 'Password must be at least 6 characters' : '';

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
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
      this.setState({ redirectToHome: true });
    } catch (error) {
      this.setState({ error: error.message });
      console.error("Error:", error);
    }
  };

  render() {
    const { email, password, error, emailError, passwordError, redirectToHome } = this.state;
    const { isSignIn } = this.props;

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
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
  }
}

export default AuthComponent;
