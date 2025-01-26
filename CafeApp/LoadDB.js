const axios = require('axios');
const { db } = require('./FirebaseConfig.js');
const { GeoPoint, doc, setDoc, collection } = require('firebase/firestore');
require('dotenv').config();

// Replace with your API key and Irvine's latitude/longitude
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_API_KEY;
const IRVINE_COORDINATES = '33.6846,-117.8265';
const RADIUS = 250000; // Radius in meters
const EXCLUDED_CAFE_ID = 'MmzBVRfmenFyh8h9OJER'; // The ID of the cafe that should not be deleted

async function fetchCafes() {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${IRVINE_COORDINATES}&radius=${RADIUS}&type=cafe&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const cafes = response.data.results;

    // Print the number of cafes within the radius before limiting to 30
    console.log(`Total cafes within the radius: ${cafes.length}`);

    // Remove duplicates based on cafe name
    const uniqueCafes = [];
    const seenNames = new Set();

    for (const cafe of cafes) {
      if (!seenNames.has(cafe.name)) {
        uniqueCafes.push(cafe);
        seenNames.add(cafe.name);
      }
    }

    // Slice the first 30 cafes after removing duplicates
    const cafesToAdd = uniqueCafes.slice(0, 30);
    console.log(`Number of unique cafes: ${cafesToAdd.length}`);

    // Now proceed to add the cafes to Firestore using setDoc
    for (const cafe of cafesToAdd) {
      const cafeData = {
        name: cafe.name,
        location: new GeoPoint(cafe.geometry.location.lat, cafe.geometry.location.lng),
      };

      // Get the first image URL if available
      let imageUrl = null;
      if (cafe.photos && cafe.photos.length > 0) {
        const photoReference = cafe.photos[0].photo_reference;
        // Construct the image URL using the photo_reference
        const imageUrlResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`);
        imageUrl = imageUrlResponse.config.url; // This will be the final image URL
      }

      // Add the image URL to the cafeData if available
      if (imageUrl) {
        cafeData.imageUrl = imageUrl;
      }

      // Set the cafe data in Firestore with a custom document ID
      const cafeRef = doc(collection(db, 'Cafes'), cafe.place_id);
      await setDoc(cafeRef, cafeData);
    }

    console.log("Cafes have been successfully added to Firestore!");

  } catch (error) {
    console.error("Error fetching cafes: ", error);
  }
}

// Delete the cafes except the one with the given ID and then fetch new cafes
fetchCafes();
