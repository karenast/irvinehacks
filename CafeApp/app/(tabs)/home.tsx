import { Image, StyleSheet, Platform, View, Pressable, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalDropdown } from '@/components/GlobalDropdown';
import {MaterialIcons} from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AddVisitModal } from '@/components/AddVisitModal';
import { getUsername } from '@/app/(tabs)/database-functions';
import { auth } from '@/FirebaseConfig';
import { hardcodedCafeId } from '@/app/(tabs)/database-functions';
import MapView, { Marker } from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 33.617,
  longitude: -117.87,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser) {
        const user = await getUsername(auth.currentUser.uid);
        setUsername(user);
      }
    };
    fetchUsername();
  }, []);
 

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
            Zot n Sip!
          </ThemedText>
        </ThemedView>
      }>
      <ThemedView style={styles.sectionContainer}>
        <ThemedView style={styles.sectionContainer}>
          <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <ThemedText style={{fontSize: 16, fontWeight: 'bold'}}>Welcome{username ? ', ' + username : ""}!</ThemedText>
            <HelloWave />
          </ThemedView>
        </ThemedView> 
        <ThemedView style={styles.feedContainer}>
          <MapView
            style={styles.map}
            initialRegion={INITIAL_REGION}
          >
            {/* Add markers here if needed */}
          </MapView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginLeft: -10}}>Friends' Recent Visits</ThemedText>
        <ThemedView style={[styles.feedContainer, {backgroundColor: 'transparent'}]}>
          <ThemedView 
            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderWidth: 0.5, borderColor: '#D9D2CD', borderRadius: 4, marginHorizontal: -8, backgroundColor: 'transparent'}} 
          >
            <ThemedView 
              onTouchEnd={() => router.push({ pathname: '/(modals)/cafe', params: { id: hardcodedCafeId } }) }
              style={{flex: 1}}>
              <ThemedText style={{fontSize: 16, fontWeight: '600'}}>Mariposa</ThemedText>
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
    padding: 0,
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
  map: {
    width: '100%',
    height: 200,
  },
});
