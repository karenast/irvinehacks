import { StyleSheet, Image, Platform, TextInput } from 'react-native';
import { useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import Feather from '@expo/vector-icons/build/Feather';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabTwoScreen() {
  const [activeTab, setActiveTab] = useState('cafes');

  const renderCafesContent = () => (
    <>
      <ThemedView style={[styles.searchContainer, { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 14, borderWidth: 1, borderColor: '#D9D2CD' }]}>
        <Entypo name="magnifying-glass" size={24} color="#958475" />
        <TextInput 
          style={{ flex: 1, marginLeft: 18, fontSize: 15, fontWeight: '500' }}
          placeholder="Search cafe"
          placeholderTextColor="#958475"
          onSubmitEditing={(event) => {
            const searchTerm = event.nativeEvent.text;
            // Handle search here
            console.log('Searching for:', searchTerm);
          }}
          returnKeyType="search"
        />
      </ThemedView>
      <ThemedView style={[styles.searchContainer, {flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: '#D9D2CD'}]}>
        <Feather name="map-pin" size={24} color='#958475' />
        <TextInput 
          style={{ flex: 1, marginLeft: 18, fontSize: 15, fontWeight: '500' }}
          placeholder="City"
          placeholderTextColor="#958475"
          onSubmitEditing={(event) => {
            const searchTerm = event.nativeEvent.text;
            // Handle search here
            console.log('Location is:', searchTerm);
          }}
          returnKeyType="search"
        />
      </ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: 'bold', marginBottom: 16}} >Recents</ThemedText>
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: '#D9D2CD'}}>
        <ThemedText style={{ flex: 1, marginLeft: 8, fontSize: 16, color: '#958475' }}>
          No recent cafes. Try searching for a cafe!
        </ThemedText>
      </ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: 'bold', marginBottom: 16}} >Places you may have been to</ThemedText>
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: '#D9D2CD'}}>
      </ThemedView>
    </>
  );

  const renderFriendsContent = () => (
    <>
      <ThemedView style={[styles.searchContainer, { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 14, borderWidth: 1, borderColor: '#D9D2CD' }]}>
        <Entypo name="magnifying-glass" size={24} color="#958475" />
        <TextInput 
          style={{ flex: 1, marginLeft: 18, fontSize: 15, fontWeight: '500' }}
          placeholder="Search name"
          placeholderTextColor="#958475"
          onSubmitEditing={(event) => {
            const searchTerm = event.nativeEvent.text;
            console.log('Searching for friend:', searchTerm);
          }}
          returnKeyType="search"
        />
      </ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: 'bold', marginBottom: 16}}>Your Friends</ThemedText>
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: '#D9D2CD'}}>
        <ThemedText style={{ flex: 1, marginLeft: 8, fontSize: 16, color: '#958475' }}>
          No friends added yet 🥲
        </ThemedText>
      </ThemedView>
    </>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#CCBDB3', dark: '#353636' }}
      headerHeight={150}
      headerImage={
        <IconSymbol
          size={210}
          color='#958475'
          name="cup.and.saucer"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.tabContainer}>
          <ThemedView 
            style={[styles.tab, activeTab === 'cafes' && styles.activeTab]}
            onTouchEnd={() => setActiveTab('cafes')}>
            <ThemedText style={[styles.tabText, activeTab === 'cafes' && styles.activeTabText]}>Cafes</ThemedText>
          </ThemedView>
          <ThemedView 
            style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
            onTouchEnd={() => setActiveTab('friends')}>
            <ThemedText style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>Friends</ThemedText>
          </ThemedView>
        </ThemedView>
        {activeTab === 'cafes' ? renderCafesContent() : renderFriendsContent()}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -65,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: -12,
    marginHorizontal: -16,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#958475',
  },
  tabText: {
    fontSize: 16,
    color: '#958475',
    fontWeight: '600',
  },
  activeTabText: {
    fontWeight: '700',
  },
  contentContainer: {
    marginHorizontal: -16, // Counteracts ParallaxScrollView's padding
  },
});
