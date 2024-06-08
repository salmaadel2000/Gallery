import axios from 'axios'; // Import axios for making HTTP requests

// Pexels API key and base URL
const API_KEY = 'hcKFgDtsB8ReOrGbzZQ7AwsoZgpdXnk97rgrlbwBot6rAeiFE1IOQdWL'; 
const BASE_URL = 'https://api.pexels.com/v1/';

// Create an instance of axios with the base URL and API key in the headers
const pexelsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
  },
});

// Function to fetch curated photos from Pexels API
export const fetchCuratedPhotos = async (perPage = 15) => {
  try {
    // Make a GET request to the 'curated' endpoint with the specified number of photos per page
    const response = await pexelsApi.get('curated', {
      params: {
        per_page: perPage,
      },
    });
    // Return the array of photos from the response data
    return response.data.photos;
  } catch (error) {
    // Log and throw an error if there's an issue fetching photos
    console.error('Error fetching photos:', error);
    throw error;
  }
};
