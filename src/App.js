import React, { useState, useEffect } from 'react';
import './App.scss'; // Importing styles
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Importing routing components
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
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Effect to check if user is already logged in based on local storage
    const storedUser = localStorage.getItem('isLoggedIn');
    if (storedUser) {
      setIsLoggedIn(true);
    }

    // Firebase listener to update user state on authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup function to unsubscribe from Firebase listener
    return () => unsubscribe();
  }, [user]);

  // Function to handle user logout
  const handleLogout = async () => {
    await auth.signOut(); // Sign out user from Firebase authentication
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn flag from local storage
    setIsLoggedIn(false); // Update isLoggedIn state to false
    navigate('/login'); // Navigate to login page
  };

  return (
    <div>
      {/* Navbar component */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Routes for different pages */}
      <Routes>
        {/* Route for home page */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        
        {/* Route for login page */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <AuthComponent isSignIn={true} />} />
        
        {/* Default route */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <AuthComponent isSignIn={false} />} />
        
        {/* Route for favorite page */}
        <Route path="/favorite" element={isLoggedIn ? <Favorite /> : <Navigate to="/login" />} />
        
        {/* Route for photo grid page */}
        <Route path="/photos" element={isLoggedIn ? <PhotoGrid /> : <Navigate to="/login" />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
