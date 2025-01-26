import { Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { router } from 'expo-router';
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null); // Explicitly type the user state

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authenticatedUser = userCredential.user;
      setUser(authenticatedUser); // Update the user state
      if (authenticatedUser) router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    }
  };

  const signUp = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authenticatedUser = userCredential.user;

      // Initialize Firestore
      const db = getFirestore();

      // Add additional user details to Firestore
      await setDoc(doc(db, 'users', authenticatedUser.uid), {
        email: authenticatedUser.email,
        username: email.split('@')[0], // Example: using the email prefix as the username
        createdAt: new Date(),
      });

      // Update user state and navigate
      setUser(authenticatedUser);
      if (authenticatedUser) router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    }
  };

  // const postReview = async () => {
  //   const hardcodedReview = "this is great"; // Hardcoded review text

  //   if (user) {
  //     try {
  //       const db = getFirestore(); // Ensure Firestore is initialized
  //       const userDocRef = doc(db, 'users', user.uid); // Safely access 'uid'
  //       await updateDoc(userDocRef, {
  //         reviews: arrayUnion(hardcodedReview), // Add the hardcoded review text
  //       });
  //       alert('Review posted!');
  //     } catch (error: any) {
  //       console.log(error);
  //       alert('Error posting review: ' + error.message);
  //     }
  //   } else {
  //     alert('You need to be signed in to post a review!');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.text}>Make Account</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={postReview}>
        <Text style={styles.text}>Post Review</Text> */}
      {/* </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 40,
    color: '#1A237E',
  },
  textInput: {
    height: 50,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EAF6',
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 25,
    fontSize: 16,
    color: '#3C4858',
    shadowColor: '#9E9E9E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    width: '90%',
    marginVertical: 15,
    backgroundColor: '#5C6BC0',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C6BC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
