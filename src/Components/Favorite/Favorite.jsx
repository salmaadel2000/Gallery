import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { imgdb, db, auth } from '../../firebase/firebaseConfig';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Button, CircularProgress } from '@mui/material';
import 'sweetalert2/src/sweetalert2.scss';
import './Favorite.scss';

// SweetAlert2 with React content
const MySwal = withReactContent(Swal);

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items from Firebase storage
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Check if the user is authenticated
        const user = auth.currentUser;
        if (!user) {
          console.error('User not authenticated.');
          setLoading(false);
          return;
        }

        // Construct the storage path with the user's UID
        const storageRef = ref(imgdb, `users/${user.uid}/favourite`);

        // List all items in the storage path
        const listResult = await listAll(storageRef);

        // Get download URLs and create wishlist items
        const urls = await Promise.all(listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const description = `Description for ${itemRef.name}`; // Placeholder for description
          return { id: itemRef.name, url, description };
        }));

        setWishlist(urls);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Handle removal of an item from the wishlist
  const removeFromWishlist = async (id) => {
    // Confirmation dialog using SweetAlert2
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'mui-confirm-button',
        cancelButton: 'mui-cancel-button',
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        // Check if the user is authenticated
        const user = auth.currentUser;
        if (!user) {
          console.error('User not authenticated.');
          return;
        }

        // Delete the image from Firebase storage based on user-specific path
        const imageRef = ref(imgdb, `users/${user.uid}/favourite/${id}`);
        await deleteObject(imageRef);

        // Delete the corresponding document from Firestore
        const docRef = doc(db, `users/${user.uid}/wishlist`, id);
        await deleteDoc(docRef);

        // Update the local state to reflect the removal
        const updatedWishlist = wishlist.filter(photo => photo.id !== id);
        setWishlist(updatedWishlist);

        MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        MySwal.fire('Error!', 'There was a problem deleting the file.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
      <CircularProgress style={{ color: 'rgb(15, 118, 110)', width: '100px', height: '100px' }} />
    </div>

    );
  }

  return (
    <div className="wishlist">
       <h2>My Favorite</h2>
      {wishlist.length === 0 ? (
        <div className='no-img'>No images in your favorite list.</div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((photo) => (
            <div key={photo.id} className="wishlist-item">
              <img src={photo.url} alt={photo.id} />
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromWishlist(photo.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
