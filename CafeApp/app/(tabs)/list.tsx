import { StyleSheet, Image, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';

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
import { router } from 'expo-router';
import {AddVisitModal} from '@/components/AddVisitModal';

interface Cafe {
  id: string;
  name: string;
  tags: string[];
}



export default function TabThreeScreen() {
  const [activeTab, setActiveTab] = useState('been');
  const [location, setLocation] = useState('');
  const [locationPlaceholder, setLocationPlaceholder] = useState('Current Location');
  const [activeColor, setActiveColor] = useState('#69584B');
  const beenCafes: Cafe[] = [{ id: '1', name: 'Mariposa', tags: ['cozy', 'wifi'] }, { id: '2', name: 'Ever After Tearoom', tags: ['whimsical', 'open late'] }];
  const suggestedCafes: Cafe[] = [];
  //const friends: User[] = [];
  const [isModalVisible, setIsModalVisible] = useState(false);

  // TODO: update consts so that they get data from database
  const handleAddVisit = (rating: number, notes: string) => {
    // TODO: Implement the logic to save the visit
    console.log('Rating:', rating, 'Notes:', notes);
  };
  
  const renderCafeContent = (cafeList: Cafe[]=beenCafes) => (
    <>
      <ThemedView style={styles.contentContainer}>
      </ThemedView>
        {cafeList?.length > 0 ? (
          cafeList.map((cafe) => (
            
            <ThemedView key={cafe.id} style={{flex: 1}}>
              
            <ThemedView style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', backgroundColor: Colors.light.background, borderRadius: 10, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: '#D9D2CD'}}>
              <ThemedView
                onTouchEnd={() => router.push('/(modals)/cafe')}
                style={{flex: 1}}>
              <ThemedText style={{fontSize: 16, fontWeight: '600'}}>{cafe.name}</ThemedText>
              
              <ThemedView style={{flexDirection: 'row', gap: 8, marginTop: 4}}>
               {cafe.tags.map((tag) => (
                 <ThemedText key={tag} style={{fontSize: 12, color: '#958475'}}>#{tag}</ThemedText>
               ))}
              </ThemedView>
              </ThemedView>
              <ThemedView style={{flexDirection: 'row', gap: 16}}>
              <MaterialIcons name="bookmark" size={24} color="#958475" onPress={() => console.log('Bookmark cafe')} />
            </ThemedView>
            </ThemedView>
            <AddVisitModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onSubmit={handleAddVisit}
                  />
            </ThemedView>
        ))) : (
          <ThemedText style={{ flex: 1, marginLeft: 8, fontSize: 16, color: '#958475' }}>
            No recent cafes. Adding a cafe!
          </ThemedText>
        )}
    </>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#CCBDB3', dark: '#353636' }}
      headerHeight={150}
      headerImage={
        <ThemedView style={{ height: 100, width: '100%', position: 'relative', backgroundColor: 'transparent' }}>
          <Image
            source={require('@/assets/images/sip.png')}
            style={styles.headerImage}
            resizeMode='contain'
          />
        </ThemedView>
      }>
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.tabContainer}>
          <ThemedView 
            style={[styles.tab, activeTab === 'been' && styles.activeTab]}
            onTouchEnd={() => setActiveTab('been')}>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <MaterialIcons name="local-cafe" size={24} color={activeTab === 'been' ? '#958475' : '#D9D2CD'}/>
              <ThemedText style={[styles.tabText, activeTab === 'been' && styles.activeTabText, activeTab !== 'been' && styles.inactiveTabText]}>Been</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView 
            style={[styles.tab, activeTab === 'want' && styles.activeTab]}
            onTouchEnd={() => setActiveTab('want')}>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <MaterialIcons name="location-on" size={24} color={activeTab === 'want' ? '#958475' : '#D9D2CD'}/>
              <ThemedText style={[styles.tabText, activeTab === 'want' && styles.activeTabText, activeTab !== 'want' && styles.inactiveTabText]}>Want to Try</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView 
            style={[styles.tab, activeTab === 'rec' && styles.activeTab]}
            onTouchEnd={() => setActiveTab('rec')}>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <MaterialIcons name="storefront" size={24} color={activeTab === 'rec' ? '#958475' : '#D9D2CD'}/>
              <ThemedText style={[styles.tabText, activeTab === 'rec' && styles.activeTabText, activeTab !== 'rec' && styles.inactiveTabText]}>Recs</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        {activeTab === 'been' ? renderCafeContent() : activeTab === 'wantToTry' ? renderCafeContent() : renderCafeContent()}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 120,
    width: 200,
    bottom: -10,
    left: 200,
    top: 30,
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
