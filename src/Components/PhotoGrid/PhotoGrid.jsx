import React, { useEffect, useState } from 'react';
import { fetchCuratedPhotos } from '../../services/pexelsApi';
import Photo from '../Photo/Photo';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { imgdb } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseConfig'; // Import auth from Firebase config
import "./PhotoGrid.scss";

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photos = await fetchCuratedPhotos();
        setPhotos(photos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    loadPhotos();
  }, []);

  const addToWishlistFirestore = async (photo) => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        console.error('User not authenticated. Please log in.');
        return;
      }

      const userId = auth.currentUser.uid;
      const storageRef = ref(imgdb, `users/${userId}/favourite/${photo.id}`);

      const response = await fetch(photo.src.medium);
      const imageData = await response.blob();
      await uploadBytes(storageRef, imageData);

      const db = getFirestore();
      await addDoc(collection(db, `users/${userId}/wishlist`), {
        photoUrl: `users/${userId}/favourite/${photo.id}`
      });

      console.log('Added to favourite:', photo.id);
    } catch (error) {
      console.error('Error adding to favourite:', error);
    }
  };
  
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} addToWishlistFirestore={addToWishlistFirestore} />
      ))}
    </div>
  );
};

export default PhotoGrid;
