import { Image, StyleSheet, Platform, FlatList, View, Pressable, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

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
}

// Sample cafe data
const cafes = [
  {
    id: '1',
    name: 'Cafe Delight',
    ocassion: 'Study Session',
    rating: 4.5,
    distance: 'LA',
    nearby: 'Nearby',
    isOpen: true
  },
  {
    id: '3',
    name: 'Coffee Bean',
    ocassion: 'Work Meeting',
    rating: 4.7,
    distance: 'Fresno',
    nearby: 'Nearby',
    isOpen: true
  },
  {
    id: '4',
    name: 'Tea Garden',
    ocassion: 'Casual Hangout',
    rating: 4.4,
    distance: 'LA',
    nearby: 'Nearby',
    isOpen: false
  },
  {
    id: '5',
    name: 'The Daily Grind',
    ocassion: 'Quick Coffee',
    rating: 4.3,
    distance: 'Irvine',
    nearby: 'Nearby',
    isOpen: true
  }
];

export default function ListScreen() {
  // State to hold our cafes list
  const [cafesList, setCafesList] = useState(cafes);
  const [showInputModal, setShowInputModal] = useState(false);
  const [newCafeName, setNewCafeName] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newNearbyLocation, setNewNearbyLocation] = useState('');
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
        isOpen: true
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

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#F2E8D3', dark: '#958475' }}
        headerHeight={200}
        headerImage={
          <View style={styles.headerContainer}>
            <ThemedText type="title" style={styles.headerTitle}>
              Cafes
            </ThemedText>
          </View>
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Want to Try</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.addButtonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.mainAddButton,
              pressed && styles.pressed
            ]}
            onPress={() => setShowInputModal(true)}
          >
            <View style={styles.addButtonContent}>
              <MaterialIcons name="add" size={24} color="#F2E8D3" />
              <ThemedText style={styles.addButtonText}>Places to Try!</ThemedText>
            </View>
          </Pressable>
        </ThemedView>
        <FlatList
          data={cafesList}
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
});
