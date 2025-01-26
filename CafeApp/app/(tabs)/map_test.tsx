import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Alert } from 'react-native';
import { getFirestore, collection, getDocs, GeoPoint } from 'firebase/firestore';
import { auth } from '../../FirebaseConfig';  // assuming this is where Firebase is initialized

const INITIAL_REGION = {
  latitude: 33.64,
  longitude: -117.84,
  latitudeDelta: 2,
  longitudeDelta: 2
};

export default function App() {
  const [cafes, setCafes] = useState([]); // State to hold cafes

  // Fetch cafes from Firestore
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const db = getFirestore();  // Make sure to initialize Firestore correctly
        const cafesCollection = collection(db, 'Cafes');
        const cafeSnapshot = await getDocs(cafesCollection);
        
        const cafeList = cafeSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            location: data.location // Assuming location is a GeoPoint
          };
        });
        
        setCafes(cafeList);
      } catch (error) {
        console.error("Error fetching cafes: ", error);
        Alert.alert("Error", "Failed to fetch cafes." + error);
      }
    };

    fetchCafes();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {cafes.map((cafe) => (
          <Marker
            key={cafe.id}
            coordinate={{
              latitude: cafe.location.latitude,
              longitude: cafe.location.longitude
            }}
            title={cafe.name} // Display cafe name when marker is clicked
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
