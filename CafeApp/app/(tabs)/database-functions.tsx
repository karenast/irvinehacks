import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { auth } from '../../FirebaseConfig';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
const hardcodedReview = "this is great";
export const hardcodedCafeId = "ChIJA0fEtDXc3IAREDMAngyh3lo"; // Cafe ID

export async function getUsername(uid: string): Promise<string> {
  const db = getFirestore();
  const userDoc = await doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDoc);
  const userData = userDocSnap.data();
  return userData ? userData.username : '';
}

export async function updateUsername(uid: string, newUsername: string): Promise<void> {
  const db = getFirestore();
  const userDoc = doc(db, 'users', uid);
  await updateDoc(userDoc, { username: newUsername });
}

export async function postReview(cafe: String = hardcodedCafeId, rating: number, review: any = hardcodedReview): Promise<boolean> {
  const user = auth.currentUser;
  if (review.trim() === "") {review = null;}
  if (user) {
    try {
      const db = getFirestore();

      // Add the review to the "reviews" collection
      const reviewDocRef = await addDoc(collection(db, 'reviews'), {
        uid: user.uid,
        review: review,
        cafeId: cafe,
        rating: rating,
      });

      //Once the review is added, update the corresponding cafe document
      const cafeDocRef = doc(db, 'Cafes', hardcodedCafeId);
      await updateDoc(cafeDocRef, {
        reviews: arrayUnion(reviewDocRef.id), // Append the review document ID to the "reviews" array in the cafe document
      });

      // Now, update the user's document to append the review document ID to the "reviews" array
      const userDocRef = doc(db, 'users', user.uid); // Get the reference to the user's document
      await updateDoc(userDocRef, {
        reviews: arrayUnion(reviewDocRef.id), // Append the review document ID to the "reviews" array in the user's document
      });

      Alert.alert('Success', 'Review posted and added to the cafe and your profile!');
    } catch (error) {
      console.error('Error posting review:', error);
    }
  } else {
    Alert.alert('Error', 'You need to be signed in to post a review!');
  }
  return true;
};

//export default function TabOneScreen(): JSX.Element {

  // const postReview = async (cafe=hardcodedCafeId, rating: number, review=hardcodedReview) => {
  //   const user = auth.currentUser;

  //   if (user) {
  //     try {
  //       const db = getFirestore();

  //       // Add the review to the "reviews" collection
  //       const reviewDocRef = await addDoc(collection(db, 'reviews'), {
  //         uid: user.uid,
  //         review: review,
  //         cafeId: cafe,
  //         rating: rating,
  //       });

  //       // Once the review is added, update the corresponding cafe document
  //       const cafeDocRef = doc(db, 'Cafes', hardcodedCafeId);
  //       await updateDoc(cafeDocRef, {
  //         reviews: arrayUnion(reviewDocRef.id), // Append the review document ID to the "reviews" array in the cafe document
  //       });

  //       // Now, update the user's document to append the review document ID to the "reviews" array
  //       const userDocRef = doc(db, 'users', user.uid); // Get the reference to the user's document
  //       await updateDoc(userDocRef, {
  //         reviews: arrayUnion(reviewDocRef.id), // Append the review document ID to the "reviews" array in the user's document
  //       });

  //       Alert.alert('Success', 'Review posted and added to the cafe and your profile!');
  //     } catch (error) {
  //       console.error('Error posting review:', error);
  //     }
  //   } else {
  //     Alert.alert('Error', 'You need to be signed in to post a review!');
  //   }
  // };

  
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>User Actions</Text>
  //     <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
  //       <Text style={styles.text}>Sign Out</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.button} onPress={postReview}>
  //       <Text style={styles.text}>Post Review</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
//}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FAFAFA',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#1A237E',
//     marginBottom: 40,
//   },
//   button: {
//     width: '90%',
//     backgroundColor: '#5C6BC0',
//     padding: 20,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#5C6BC0',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 5,
//     elevation: 5,
//     marginTop: 15,
//   },
//   text: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// import { Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, View } from 'react-native';
// import React, { useState } from 'react';
// import { auth } from '../../FirebaseConfig';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
// import { router } from 'expo-router';
// import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// import MapView from 'react-native-maps';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '70%',
//     height: '70%',
//   },
// });
