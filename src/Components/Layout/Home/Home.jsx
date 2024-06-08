import React from 'react';
import PhotoGrid from '../../PhotoGrid/PhotoGrid'; // Import PhotoGrid component
import './Home.scss'; // Import associated SCSS file

const Home = () => {
  return (
    <div className="home"> {/* Container for the home page */}
      <header className="home-header"> {/* Header section */}
        <div className="overlay"> {/* Overlay for text */}
          <h1>Welcome to Our Gallery</h1> {/* Main heading */}
          <p>Explore our collection of beautiful photos</p> {/* Subheading */}
        </div>
      </header>
      <PhotoGrid /> {/* Render the PhotoGrid component */}
    </div>
  );
};

export default Home; // Export the Home component
