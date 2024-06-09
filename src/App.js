import React, { useState, useEffect } from 'react';
import './App.scss'; // Importing styles
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'; // Importing routing components
import { auth } from './firebase/firebaseConfig'; // Importing Firebase authentication
import AuthComponent from './Components/Auth/AuthComponent'; // Importing authentication component
import Navbar from './Components/Layout/Navbar/Navbar'; // Importing Navbar component
import Footer from './Components/Layout/Footer/Footer'; // Importing Footer component
import Favorite from './Components/Favorite/Favorite'; // Importing Favorite component
import Home from './Components/Layout/Home/Home'; // Importing Home component
import PhotoGrid from './Components/PhotoGrid/PhotoGrid'; // Importing PhotoGrid component

function App() {
  const [user, setUser] = useState(null); // State to hold user authentication information
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to determine if user is logged in
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Get navigate function

  useEffect(() => {
    // Check if user is already logged in based on local storage
    const storedUser = localStorage.getItem('isLoggedIn');
    if (storedUser) {
      setIsLoggedIn(true);
    }

    // Firebase listener to update user state on authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
      }
    });

    // Cleanup function to unsubscribe from Firebase listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Store current route in sessionStorage
    sessionStorage.setItem('currentRoute', location.pathname);
  }, [location]);

  // Function to handle user logout
  const handleLogout = async () => {
    await auth.signOut(); // Sign out user from Firebase authentication
    sessionStorage.removeItem('currentRoute'); // Remove current route from sessionStorage
    setIsLoggedIn(false); // Update isLoggedIn state to false
    navigate('/login'); // Navigate to login page
  };

  useEffect(() => {
    // Check if user is logged in and current stored route is '/favorite', then navigate to '/favorite'
    const currentRoute = sessionStorage.getItem('currentRoute');
    if (isLoggedIn && currentRoute === '/favorite') {
      navigate('/favorite');
    }
  }, [isLoggedIn]);

  return (
    <div>
      {/* Navbar component */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Routes for different pages */}
      <Routes>
        {/* Route for home page */}
        <Route path="/home" element={<Home />} />
        
        {/* Route for login page */}
        <Route path="/login" element={<AuthComponent isSignIn={true} />} />
        
        {/* Default route */}
        <Route path="/" element={<AuthComponent isSignIn={false} />} />
        
        {/* Route for photo grid page */}
        <Route path="/photos" element={<PhotoGrid />} />
        
        {/* Protected route for favorite page */}
        <Route path="/favorite" element={<Favorite />} />
        <Route path="*" element={<AuthComponent isSignIn={true} />}/>
      </Routes>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
