import { Image, StyleSheet, Platform, View, Pressable, Text, useColorScheme } from 'react-native';
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#F3F1EB' : '#958475';
  const backgroundColor = isDark ? '#958475' : '#F3F1EB';
  const sideColor = isDark ? '#958475' : '#F3F1EB';

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#F2E8D3', dark: '#958475' }}
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
        <ThemedView style={[styles.sectionContainer, { backgroundColor }]}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>Welcome, {user}!</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.feedContainer}>
            <ThemedText type="subtitle" style={{ color: textColor }}>Map coming soon...</ThemedText>
            <ThemedText style={{ color: textColor }}>We'll show nearby cafes here with Google Maps integration</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={[styles.sectionContainer, { backgroundColor }]}>
          <ThemedText style={{fontSize: 16, fontWeight: 'bold', marginBottom: -10, color: textColor}}>Friends' Recent Visits</ThemedText>
          <ThemedView style={[styles.feedContainer, {backgroundColor: 'transparent'}]}>
            <ThemedView 
              style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderWidth: 0.5, borderColor: '#D9D2CD', borderRadius: 4, marginHorizontal: -8, backgroundColor: 'transparent'}} 
            >
              <ThemedView 
                onTouchEnd={() => router.push('/(modals)/cafe')}
                style={{flex: 1}}>
                <ThemedText style={{fontSize: 16, fontWeight: '600', color: textColor}}>Test Cafe</ThemedText>
                <ThemedView style={{flexDirection: 'row', gap: 8, marginTop: 4}}>
                  <ThemedText style={{fontSize: 12, color: textColor}}>#cozy</ThemedText>
                  <ThemedText style={{fontSize: 12, color: textColor}}>#wifi</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={{flexDirection: 'row', gap: 16}}>
                <MaterialIcons name="add-circle-outline" size={24} color={textColor} onPress={() => setIsModalVisible(true)} />
                <MaterialIcons name="bookmark-border" size={24} color={textColor} onPress={() => console.log('Bookmark cafe')} />
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
      <View style={[styles.bottomNav, { backgroundColor }]}>
        <Pressable style={styles.navItem} onPress={() => router.push('./index')}>
          <MaterialIcons name="home" size={24} color={textColor} />
          <ThemedText style={[styles.navText, { color: textColor }]}>Home</ThemedText>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('./explore')}>
          <MaterialIcons name="explore" size={24} color={textColor} />
          <ThemedText style={[styles.navText, { color: textColor }]}>Explore</ThemedText>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('./list')}>
          <MaterialIcons name="list" size={24} color={textColor} />
          <ThemedText style={[styles.navText, { color: textColor }]}>List</ThemedText>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('./profile')}>
          <MaterialIcons name="person" size={24} color={textColor} />
          <ThemedText style={[styles.navText, { color: textColor }]}>Profile</ThemedText>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#D9D2CD',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});
