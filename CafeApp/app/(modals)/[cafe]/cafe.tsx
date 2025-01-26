import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AddVisitModal } from '@/components/AddVisitModal';
import { postReview, hardcodedCafeId } from '../../(tabs)/database-functions';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ImageBackground, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

// Initialize Firebase
const db = getFirestore();

interface Cafe {
  id: string;
  name: string;
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const INITIAL_REGION = {
  latitude: 33.617,
  longitude: 117.87,
  latitudeDelta: 2,
  longitudeDelta: 2,
};


const currentIcon = "add-circle-outline";

export default function CafeScreen() {
  const route = useRoute();
  console.log('Route params:', route.params);
  const { cafe } = route.params as { cafe: string };
  const { id } = route.params as { id: string };
  console.log(cafe);
  console.log(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the review is submitted
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
      console.log('Cafe data:', name);
    };

    fetchCafeData();
    setImage(cafeData?.imageUrl || "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AVzFdbkeSXrRbyedBMhsdVSzO-Yf7oerIOpaWkts_P0aTijaHBCMn_whG5SomT0B9FL1FIAFqDTF6nL4yLsULRCJjaAFYM7rzlRWy1qbR8YtbX6ehlfX2dX5FX5zX2jXhUP2SYOtJxiRG8CS-TxTgtny6AVrG23RR6okiNuFQ-gjCUq-yjPg&key=AIzaSyDRtJNHNbMUoFDvYySqVID-2oh-GUNR6a0");
    setName(cafeData?.name || 'Loading...');
    console.log('name:', name);
    console.log('image:', image);
  }, [cafe]);

  // const checkUserReview = async (cafeId: string, userId: string) => {
  //   try {
  //     const response = await axios.get(`/api/reviews?cafeId=${cafeId}&userId=${userId}`);
  //     return response.data.length > 0; // Return true if the user has reviewed the cafe
  //   } catch (error) {
  //     console.error('Error checking user review:', error);
  //     throw error;
  //   }
  // };

  const handleAddVisit = async (rating: number, notes: string) => {
    try {
      await postReview(hardcodedCafeId, rating, notes);
      setIsSubmitted(true); // Set the submitted state to true
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
          source={{ uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AVzFdbkeSXrRbyedBMhsdVSzO-Yf7oerIOpaWkts_P0aTijaHBCMn_whG5SomT0B9FL1FIAFqDTF6nL4yLsULRCJjaAFYM7rzlRWy1qbR8YtbX6ehlfX2dX5FX5zX2jXhUP2SYOtJxiRG8CS-TxTgtny6AVrG23RR6okiNuFQ-gjCUq-yjPg&key=AIzaSyDRtJNHNbMUoFDvYySqVID-2oh-GUNR6a0" }} // Use cafeData.imageUrl directly
          style={styles.backgroundImage}
        ></ImageBackground>
        <ThemedView style={styles.overlayContainer}>
          <ThemedText style={[styles.overlayTitle, { fontSize: 25, fontWeight: '700', marginBottom: -10 }]} type='title'>Mariposa</ThemedText>
          <ThemedView style={styles.actionButtons}>
            <ThemedView style={styles.transparentButton}>
              {isSubmitted ? (
                <MaterialIcons name='check-circle' size={42} color="#423932" /> // Show check icon if submitted
              ) : (
                <MaterialIcons 
                  name="add-circle-outline" 
                  size={42} 
                  color="#423932" 
                  onPress={() => setIsModalVisible(true)} 
                />
              )}
            </ThemedView>
            <ThemedView style={styles.transparentButton}>
              <MaterialIcons name="bookmark-border" size={42} color="#423932" onPress={() => console.log('Bookmark cafe')} />
            </ThemedView>
          </ThemedView>
      </ThemedView>
      <ThemedView style={styles.tagsContainer}>
        <ThemedText style={styles.tag}>#cozy</ThemedText>
        <ThemedText style={styles.tag}>#wifi</ThemedText>
      </ThemedView> 
      <ThemedView style={styles.infoSection}>
        <ThemedText style={styles.description}>
        </ThemedText>
      </ThemedView>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        <Marker
          key={cafeData.id}
          coordinate={{
            latitude: INITIAL_REGION.latitude,
            longitude: INITIAL_REGION.longitude
          }}
          title={cafeData.name} // Display cafe name when marker is clicked
        >
          <Callout>
          </Callout>
        </Marker>
      </MapView>
      <AddVisitModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddVisit}        
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  imageContainer: {
    height: 290,
    backgroundColor: '#F2E8D3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 550,
    left: 9,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#423932',
    backgroundColor: 'transparent',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 0,
    backgroundColor: 'transparent',
    marginLeft: 150,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 10,
    marginTop: 10,
  },
  tag: {
    backgroundColor: Colors.light.background,
    padding: 7,
    borderRadius: 20,
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: 700,
    marginRight: 8,
    borderWidth: 1.5,
    fontSize: 12,
    borderColor: '#D9D2CD',
  },
  
  description: {
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: .4,
    height: 295,
  },
  map: {
    height: 460,
    margin: 0,
    position: 'relative',
  },
});