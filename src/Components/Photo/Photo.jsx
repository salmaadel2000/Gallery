import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './Photo.scss';

const Photo = ({ photo, addToWishlistFirestore }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    addToWishlistFirestore(photo);
    setOpen(true);
  };


  return (
    <div className="photo-container">
      <img src={photo.src.medium} alt={photo.alt} />
      <button onClick={handleClick}>Favorite</button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          sx={{ width: '100%' }}
        >
          Okay, this image has been added to your favorites page.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Photo;
