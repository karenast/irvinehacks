import { Image, StyleSheet, Platform, FlatList, View, Pressable, TextInput, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth } from '../FirebaseConfig';

async function fetchUserReviewsWithCafeNames(){
    const user = auth.currentUser;
    if(user){
        try{
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                Alert.alert("Error", "User document does not exist.");
                return [];
              }
          
              const userData = userDoc.data();
              const userReviews = userData?.reviews;
          
              if (!userReviews || userReviews.length === 0) {
                Alert.alert("No Reviews", "You have no reviews.");
                return [];
              }

              const reviewsWithCafeNames = await Promise.all(
                userReviews.map(async (reviewId) => {
                  const reviewDocRef = doc(db, "reviews", reviewId);
                  const reviewDoc = await getDoc(reviewDocRef);
          
                  if (!reviewDoc.exists()) {
                    console.warn(`Review with ID ${reviewId} does not exist.`);
                    return null;
                  }
          
                  const reviewData = reviewDoc.data();
                  const { cafeId, review: reviewStr } = reviewData;
          
                  const cafeDocRef = doc(db, "Cafes", cafeId);
                  const cafeDoc = await getDoc(cafeDocRef);
          
                  if (!cafeDoc.exists()) {
                    Alert.alert(cafeId);
                    console.warn(`Cafe with ID ${cafeId} does not exist.`);
                    return { reviewStr, cafeName: "Unknown Cafe" };
                  }
          
                  const cafeData = cafeDoc.data();
                  const cafeName = cafeData.name;
                  return { reviewStr, cafeName };
                })
            );
            return reviewsWithCafeNames.filter(Boolean);
        } catch(error: any){
            console.error('Error posting review:', error);
            Alert.alert('Error posting review:', error);
        }
    } else{
        Alert.alert('Error', 'You need to be signed in to view your reviews');
        return [];
    }
  // State to hold our cafes list
};

export default function ListScreen() {
    const [reviewsList, setReviewsList] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
  
    useEffect(() => {
      const fetchReviews = async () => {
        const reviews = await fetchUserReviewsWithCafeNames();
        setReviewsList(reviews);
      };
  
      fetchReviews();
    }, []);
  
    const renderReviewsContent = ({ item }) => (
      <Pressable
        style={({ pressed }) => [
          styles.reviewCard,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          setSelectedReview(item);
          setShowDetailsModal(true);
        }}
      >
        <View style={styles.reviewInfo}>
          <ThemedText type="subtitle">{item.cafeName}</ThemedText>
          <ThemedText>{item.reviewStr}</ThemedText>
        </View>
      </Pressable>
    );
  
    return (
      <>
        <ParallaxScrollView
                headerBackgroundColor={{ light: '#F2E8D3', dark: '#958475' }}
                headerHeight={200}
                headerImage={
                  <View style={styles.headerContainer}>
                    <ThemedText type="title" style={styles.headerTitle}>
                      My Cafes
                    </ThemedText>
                  </View>
                }
              ></ParallaxScrollView>
  
        <FlatList
          data={reviewsList}
          renderItem={renderReviewsContent}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
  
        <Modal
          visible={showDetailsModal}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText type="title" style={styles.detailsTitle}>
                {selectedReview?.cafeName}
              </ThemedText>
              <ThemedText>{selectedReview?.reviewStr}</ThemedText>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  setShowDetailsModal(false);
                  setSelectedReview(null);
                }}
              >
                <MaterialIcons name="close" size={24} color="#3D0C02" />
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    listContainer: {
      padding: 16,
      gap: 16,
    },
    reviewCard: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    reviewInfo: {
      gap: 4,
    },
    pressed: {
      opacity: 0.7,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#F3F1EB',
      padding: 16,
      borderRadius: 12,
      width: '80%',
      alignItems: 'center',
    },
    detailsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    closeButton: {
      marginTop: 16,
      padding: 8,
      backgroundColor: '#F2E8D3',
      borderRadius: 8,
    },
  });
