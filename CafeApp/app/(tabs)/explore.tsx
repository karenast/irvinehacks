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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default function TabTwoScreen() {
  const [activeTab, setActiveTab] = useState('cafes');
  const [location, setLocation] = useState('');
  const [locationPlaceholder, setLocationPlaceholder] = useState('Current Location');
  const [activeColor, setActiveColor] = useState('#69584B');
  const recentCafes: Cafe[] = [];
  const suggestedCafes: Cafe[] = [];
  const friends: User[] = [];

  // TODO: update consts so that they get data from database

  const renderCafesContent = () => (
    <>
      <ThemedView style={[styles.searchContainer, { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 14, borderWidth: 1, borderColor: '#D9D2CD' }]}>
        <Entypo name="magnifying-glass" size={24} color="#958475" />
        <TextInput 
          style={{ flex: 1, marginLeft: 18, fontSize: 15, fontWeight: '500' }}
          placeholder="Search cafe"
          placeholderTextColor="#958475"
          onSubmitEditing={(event) => {
            
            const searchCafe= event.nativeEvent.text;
            const searchLocation = !(location) ? 'Current Location' : location;
            // Handle search here
            console.log('cafe is:', searchCafe);
            console.log('Location is:', searchLocation);
          }}
          returnKeyType="search"
        />
      </ThemedView>
      <ThemedView style={styles.contentContainer}>

      </ThemedView>
      <ThemedView style={[styles.searchContainer, {flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: '#D9D2CD'}]}>
        <Feather name="map-pin" size={24} color='#958475' />
        <TextInput 
          style={{ flex: 1, marginLeft: 18, fontSize: 15, fontWeight: '500' }}
          placeholder={locationPlaceholder}
          placeholderTextColor={activeColor}
          value={location}
          onPressIn={() => {
            setLocationPlaceholder('City');
            setActiveColor('#958475');
          }}
          onChangeText={setLocation}
          onEndEditing={() => {setLocationPlaceholder('Current Location'); setActiveColor('#69584B')}}
          onSubmitEditing={(event) => {
            const searchLocation = event.nativeEvent.text;
            console.log("Location is:", searchLocation);

            // Handle search for location here.
          }}
          returnKeyType="search"
        />
      </ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: 'bold', marginBottom: 16}} >Recents</ThemedText>
      <ThemedView style={{flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: '#D9D2CD'}}>
        {recentCafes?.length > 0 ? (
          recentCafes.map((cafe) => (
            <ThemedView key={cafe.id} style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              <ThemedText style={{ flex: 1, marginLeft: 8, fontSize: 16 }}>
                {cafe.name}
              </ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText style={{ flex: 1, marginLeft: 8, fontSize: 16, color: '#958475' }}>
            No recent cafes. Try searching for a cafe!
          </ThemedText>
        )}
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
        {friends?.length > 0 ? (
          friends.map((friend) => (
            <ThemedView key={friend.id} style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              <ThemedText style={{ flex: 1, marginLeft: 8, fontSize: 16 }}>
                {friend.name}
              </ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText style={{ flex: 1, marginLeft: 8, fontSize: 16, color: '#958475' }}>
            No friends added yet 🥲
          </ThemedText>
        )}
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
            <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <MaterialIcons name="storefront" size={24} color={activeTab === 'cafes' ? '#958475' : '#D9D2CD'}/>
              <ThemedText style={[styles.tabText, activeTab === 'cafes' && styles.activeTabText, activeTab !== 'cafes' && styles.inactiveTabText]}>Cafes</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView 
            style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
            onTouchEnd={() => setActiveTab('friends')}>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <MaterialIcons name="people-alt" size={24} color={activeTab === 'friends' ? '#958475' : '#D9D2CD'}/>
              <ThemedText style={[styles.tabText, activeTab === 'friends' && styles.activeTabText, activeTab !== 'friends' && styles.inactiveTabText]}>Friends</ThemedText>
            </ThemedView>
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
    fontWeight: '600',
  },
  activeTabText: {
    color: '#958475',
    fontWeight: '700',
  },
  inactiveTabText: {
    color: '#D9D2CD',
  },
  contentContainer: {
    marginHorizontal: -16, // Counteracts ParallaxScrollView's padding
  },
});
