import { router } from 'expo-router';
import { Image, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F2E8D3', dark: '#F2E8D3'
      }}
      headerHeight={200}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
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
  button: {
    width: '90%',
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
    marginTop: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});


