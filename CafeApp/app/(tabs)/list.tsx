import React, { useState, useMemo } from 'react';
import { StyleSheet, Platform, FlatList, View, Pressable, TextInput, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { Tabs } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Add this interface before the cafes array
interface Cafe {
  id: string;
  name: string;
  ocassion: string;
  rating: number;
  distance: string;
  nearby: string;
  isOpen: boolean;
  hasVisited: boolean;
  isRecommended: boolean;
}

// Sample cafe data
const cafes: Cafe[] = [
  {
    id: '1',
    name: 'Cafe Delight',
    ocassion: 'Study Session',
    rating: 4.5,
    distance: 'LA',
    nearby: 'Nearby',
    isOpen: true,
    hasVisited: true,
    isRecommended: false
  },
  {
    id: '3',
    name: 'Coffee Bean',
    ocassion: 'Work Meeting',
    rating: 4.7,
    distance: 'Fresno',
    nearby: 'Nearby',
    isOpen: true,
    hasVisited: false,
    isRecommended: false
  },
];

// Add this before the ListScreen component
export const useFilteredCafes = (cafesList: Cafe[], filter: string | undefined) => {
  return useMemo(() => {
    if (!filter) return cafesList;
    
    return cafesList.filter(cafe => {
      switch (filter) {
        case 'been':
          return cafe.hasVisited === true;
        case 'wantToTry':
          return cafe.hasVisited !== true;
        case 'recommendations':
          return cafe.isRecommended === true;
        default:
          return true;
      }
    });
  }, [cafesList, filter]);
};

export default function ListScreen() {
  const { filter } = useLocalSearchParams();
  const filterValue = Array.isArray(filter) ? filter[0] : filter;
  // State to hold our cafes list
  const [cafesList, setCafesList] = useState(cafes);
  const [showInputModal, setShowInputModal] = useState(false);
  const [newCafeName, setNewCafeName] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newNearbyLocation, setNewNearbyLocation] = useState('');
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Use the custom hook here
  const filteredCafesList = useFilteredCafes(cafesList, filterValue);

  // Function to get the title based on filter
  const getTitle = () => {
    switch (filterValue) {
      case 'been':
        return 'Places I\'ve Been';
      case 'wantToTry':
        return 'Want to Try';
      case 'recommendations':
        return 'Recommendations';
      default:
        return 'Cafes';
    }
  };

  // Function to add a new cafe
  const handleSaveCafe = () => {
    if (newCafeName && newOccasion && newNearbyLocation) {
      const newCafe: Cafe = {
        id: (cafesList.length + 1).toString(),
        name: newCafeName,
        ocassion: newOccasion,
        rating: 5.0,
        distance: 'Location',
        nearby: newNearbyLocation,
        isOpen: true,
        hasVisited: false,
        isRecommended: false
      };
      setCafesList([...cafesList, newCafe]);
      
      // Reset form
      setNewCafeName('');
      setNewOccasion('');
      setNewNearbyLocation('');
      setShowInputModal(false);
    }
  };

  // Add this function inside ListScreen component
  const deleteCafe = (id: string) => {
    setCafesList(cafesList.filter(cafe => cafe.id !== id));
  };

  const renderCafesContent = ({ item }: { item: Cafe }) => (
    <Pressable
      style={({ pressed }) => [
        styles.restaurantCard,
        pressed && styles.pressed
      ]}
      onPress={() => {
        setSelectedCafe(item);
        setShowDetailsModal(true);
      }}
    >
      <View style={styles.restaurantInfo}>
        <View style={styles.headerRow}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          <Pressable
            onPress={() => deleteCafe(item.id)}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed
            ]}
          >
            <MaterialIcons name="delete" size={20} color="#3D0C02" />
          </Pressable>
        </View>
        <ThemedText>{item.ocassion}</ThemedText>
        <View style={styles.restaurantDetails}>
          <MaterialIcons 
            name="local-cafe"
            size={16} 
            color="#3D2B1F" 
          />
          <ThemedText>{item.rating}</ThemedText>
          <ThemedText>•</ThemedText>
          <ThemedText>{item.distance}</ThemedText>
          <ThemedText style={item.isOpen ? styles.open : styles.closed}>
            {item.isOpen ? 'Open' : 'Closed'}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );

  // Add this component inside ListScreen but before the return statement
  const ListTabs = () => {
    const tabs = [
      { key: 'been', label: 'Been' },
      { key: 'wantToTry', label: 'Want to Try' },
      { key: 'recommendations', label: 'Recs' },
    ];

    return (
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            style={({ pressed }) => [
              styles.tab,
              filterValue === tab.key && styles.activeTab,
              pressed && styles.pressed
            ]}
            onPress={() => router.push({
              pathname: '/list',
              params: { filter: tab.key }
            })}
          >
            <ThemedText style={[
              styles.tabText,
              filterValue === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#F2E8D3', dark: '#958475' }}
        headerHeight={200}
        headerImage={
          <View style={styles.headerContainer}>
            <ThemedText type="title" style={styles.headerTitle}>
              {getTitle()}
            </ThemedText>
          </View>
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{getTitle()}</ThemedText>
          <HelloWave />
        </ThemedView>
        <ListTabs />
        <FlatList
          data={filteredCafesList}
          renderItem={renderCafesContent}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </ParallaxScrollView>

      <Modal
        visible={showInputModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Cafe Name"
              value={newCafeName}
              onChangeText={setNewCafeName}
            />
            <TextInput
              style={styles.input}
              placeholder="Occasion"
              value={newOccasion}
              onChangeText={setNewOccasion}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newNearbyLocation}
              onChangeText={setNewNearbyLocation}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowInputModal(false);
                  setNewCafeName('');
                  setNewOccasion('');
                  setNewNearbyLocation('');
                }}
              >
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.button, styles.addButton]}
                onPress={handleSaveCafe}
              >
                <ThemedText style={styles.buttonText}>Add</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showDetailsModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.detailsHeader}>
              <ThemedText type="title" style={styles.detailsTitle}>
                {selectedCafe?.name}
              </ThemedText>
              <Pressable
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressed
                ]}
                onPress={() => {
                  setShowDetailsModal(false);
                  setSelectedCafe(null);
                }}
              >
                <MaterialIcons name="close" size={24} color="#3D0C02" />
              </Pressable>
            </View>
            
            <View style={styles.detailsContent}>
              <View style={styles.detailRow}>
                <MaterialIcons name="event" size={20} color="#3D0C02" />
                <ThemedText style={styles.detailText}>
                  Occasion: {selectedCafe?.ocassion}
                </ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialIcons name="local-cafe" size={20} color="#3D0C02" />
                <ThemedText style={styles.detailText}>
                  Rating: {selectedCafe?.rating}
                </ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialIcons name="location-on" size={20} color="#3D0C02" />
                <ThemedText style={styles.detailText}>
                  Location: {selectedCafe?.distance}
                </ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialIcons name="place" size={20} color="#3D0C02" />
                <ThemedText style={styles.detailText}>
                  Nearby: {selectedCafe?.nearby}
                </ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialIcons 
                  name={selectedCafe?.isOpen ? "check-circle" : "cancel"} 
                  size={20} 
                  color={selectedCafe?.isOpen ? "#4CAF50" : "#F44336"} 
                />
                <ThemedText style={[
                  styles.detailText,
                  { color: selectedCafe?.isOpen ? "#4CAF50" : "#F44336" }
                ]}>
                  {selectedCafe?.isOpen ? "Open" : "Closed"}
                </ThemedText>
              </View>
            </View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  restaurantCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantInfo: {
    gap: 4,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  open: {
    color: '#3D2B1F',
  },
  closed: {
    color: '#3D0C02',
  },
  addButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  mainAddButton: {
    backgroundColor: '#958475',
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#F3F1EB',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F3F1EB',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#958475',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#3D0C02',
  },
  addButton: {
    backgroundColor: '#958475',
  },
  buttonText: {
    color: '#F3F1EB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  openButton: {
    backgroundColor: '#958475',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
  },
  detailsContent: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F1EB',
  },
  activeTab: {
    backgroundColor: '#958475',
  },
  tabText: {
    color: '#958475',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#F3F1EB',
  },
});
