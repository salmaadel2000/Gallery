import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Photo.scss';

const Photo = ({ photo, addToWishlistFirestore, favorites = [] }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleClick = () => {
    if (!isLoggedIn) {
      setMessage('You need to log in to add this image to your favorites.');
    } else {
      if (favorites.some((favorite) => favorite.id === photo.id)) {
        setMessage('This image is already in your favorites.');
      } else {
        addToWishlistFirestore(photo);
        setMessage('Okay, this image has been added to your favorites page.');
      }
    }
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
        setMessage(''); // Reset the message when closing the Snackbar
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div className="photo-container">
      <img src={photo.src.medium} alt={photo.alt} />
      <button onClick={handleClick}>Favorite</button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={isLoggedIn ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Photo;
