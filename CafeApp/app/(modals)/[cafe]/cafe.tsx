import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Platform, View, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { AddVisitModal } from '@/components/AddVisitModal';
import { postReview, hardcodedCafeId } from '../../(tabs)/database-functions';
import { ImageBackground, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Import MapView

import { getFirestore, collection, getDocs, GeoPoint, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../FirebaseConfig';

// Initialize Firebase
const db = getFirestore();

interface Cafe {
  id: string;
  name: string;
  imageUrl: string;
}

const currentIcon = "add-circle-outline";

const INITIAL_REGION = {
  latitude: 33.64,
  longitude: -117.84,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

export default function CafeScreen() {
  const route = useRoute();
  const { cafe } = route.params as { cafe: string };
  const { id } = route.params as { id: string };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cafeData, setCafeData] = useState<Cafe | null>(null);
  const [image, setImage] = useState('');
  const [name, setName] = useState('Not Yet Loaded');

  useEffect(() => {
    const fetchCafeData = async () => {
      try {
        const cafeDoc = doc(db, 'Cafes', id);
        const cafeSnapshot = await getDoc(cafeDoc);
        if (cafeSnapshot.exists()) {
          setCafeData(cafeSnapshot.data() as Cafe);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching cafe data:', error);
      }
    };

    fetchCafeData();
    setImage(cafeData?.imageUrl || '');
    setName(cafeData?.name || 'Loading...');
  }, [cafe]);

  const [cafes, setCafes] = useState([]); // State to hold cafes
  
  // Fetch cafes from Firestore
  useEffect(() => {
  const fetchCafes = async () => {
    try {
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

  const handleAddVisit = async (rating: number, notes: string) => {
    try {
      await postReview(hardcodedCafeId, rating, notes);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (!cafeData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        source={{ uri: cafeData.imageUrl }} // Use cafeData.imageUrl directly
        style={styles.backgroundImage}
      />
      <ThemedView style={styles.overlayContainer}>
        <ThemedText style={styles.overlayTitle}>{name}</ThemedText>
        <ThemedView style={styles.actionButtons}>
          <MaterialIcons
            name={isSubmitted ? 'check-circle' : 'add-circle-outline'}
            size={42}
            color="#423932"
            onPress={() => setIsModalVisible(true)}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.infoSection}>
        <ThemedText style={styles.sectionTitle}>About</ThemedText>
        <ThemedText style={styles.description}></ThemedText>
      </ThemedView>

      <AddVisitModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddVisit}
      />

      {/* Map section - placed at the bottom */}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  backgroundImage: {
    height: 300,
    resizeMode: 'cover',
    opacity: 0.4,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 200, // Adjust based on your design
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#423932',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  infoSection: {
    padding: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    marginTop: 20,
    height: 300, // Set a fixed height for the map
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
