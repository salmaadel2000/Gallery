import React from 'react';
import './Photo.scss';

const Photo = ({ photo, addToWishlistFirestore }) => {
  return (
    <div className="photo-container">
      <img src={photo.src.medium} alt={photo.alt} />
      <button onClick={() => addToWishlistFirestore(photo)}>Favorite</button>
    </div>
  );
};

export default Photo;
