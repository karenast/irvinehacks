import { Image, StyleSheet, Platform, View, Pressable, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalDropdown } from '@/components/GlobalDropdown';
import {MaterialIcons} from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AddVisitModal } from '@/components/AddVisitModal';

const user = 'John';

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddVisit = (rating: number, notes: string) => {
    // TODO: Implement the logic to save the visit
    console.log('Rating:', rating, 'Notes:', notes);
  };

  // State for controlling menu visibility
  const [showMenu, setShowMenu] = useState(false);
  
  // Get color scheme and set colors based on dark/light mode
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#F3F1EB' : '#958475';
  const backgroundColor = isDark ? '#958475' : '#F3F1EB';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F2E8D3', dark: '#F2E8D3' }}
      headerHeight={200}
      headerImage={
        <ThemedView>
          <Image
            source={require('@/assets/images/sleep.png')}
            style={styles.reactLogo}
            resizeMode="contain"
          />
          <ThemedText style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, backgroundColor: 'transparent', position: 'absolute', top: 120, left: 90, right: 0}}>
            CafeApp
          </ThemedText>
        </ThemedView>
      }>
      <ThemedView style={styles.sectionContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={{fontSize: 16, fontWeight: 'bold'}}>Welcome, {user}!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.feedContainer}>
          <ThemedText type="subtitle">Map coming soon...</ThemedText>
          <ThemedText>We'll show nearby cafes here with Google Maps integration</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={{fontSize: 16, fontWeight: 'bold', marginBottom: -10}}>Friends' Recent Visits</ThemedText>
        <ThemedView style={[styles.feedContainer, {backgroundColor: 'transparent'}]}>
          <ThemedView 
            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderWidth: 0.5, borderColor: '#D9D2CD', borderRadius: 4, marginHorizontal: -8, backgroundColor: 'transparent'}} 
          >
            <ThemedView 
              onTouchEnd={() => router.push('/(modals)/cafe')}
              style={{flex: 1}}>
              <ThemedText style={{fontSize: 16, fontWeight: '600'}}>Test Cafe</ThemedText>
              <ThemedView style={{flexDirection: 'row', gap: 8, marginTop: 4}}>
                <ThemedText style={{fontSize: 12, color: '#958475'}}>#cozy</ThemedText>
                <ThemedText style={{fontSize: 12, color: '#958475'}}>#wifi</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={{flexDirection: 'row', gap: 16}}>
              <MaterialIcons name="add-circle-outline" size={24} color="#958475" onPress={() => setIsModalVisible(true)} />
              <MaterialIcons name="bookmark-border" size={24} color="#958475" onPress={() => console.log('Bookmark cafe')} />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <AddVisitModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddVisit}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  sectionContainer: {
    gap: 16,
    marginBottom: 24,
  },
  feedContainer: {
    gap: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(242, 232, 211, 0.3)',
    color: Colors.light.background,
    marginHorizontal: -16,
    marginTop: -10,
  },
  reactLogo: {
    height: 150,
    width: 200,
    bottom: -20,
    left: -10,
    top: 45,
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  menuButton: {
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});

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
