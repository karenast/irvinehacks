import { ScrollView, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AddVisitModal } from '@/components/AddVisitModal';

export default function CafeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddVisit = (rating: number, notes: string) => {
    // TODO: Implement the logic to save the visit
    console.log('Rating:', rating, 'Notes:', notes);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.imageContainer}>
        <IconSymbol
          size={210}
          color='#958475'
          name="cup.and.saucer"
        />
        <ThemedView style={styles.overlayContainer}>
          <ThemedText style={[styles.overlayTitle, { fontSize: 33, fontWeight: '800', marginBottom: -10 }]} type='title'>Test Cafe</ThemedText>
          <ThemedView style={styles.actionButtons}>
            <ThemedView style={styles.transparentButton}>
              <MaterialIcons 
                name="add-circle-outline" 
                size={42} 
                color="#958475" 
                onPress={() => setIsModalVisible(true)} 
              />
            </ThemedView>
            <ThemedView style={styles.transparentButton}>
              <MaterialIcons name="bookmark-border" size={42} color="#958475" onPress={() => console.log('Bookmark cafe')} />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.tagsContainer}>
        <ThemedText style={styles.tag}>#cozy</ThemedText>
        <ThemedText style={styles.tag}>#wifi</ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoSection}>
        <ThemedText style={styles.sectionTitle}>About</ThemedText>
        <ThemedText style={styles.description}>
          A cozy cafe perfect for working or studying. Free wifi available.
        </ThemedText>
      </ThemedView>

      <AddVisitModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddVisit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#F2E8D3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#69584B',
    backgroundColor: 'transparent',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 0,
    backgroundColor: 'transparent',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 12,
    marginTop: 12,
  },
  tag: {
    backgroundColor: Colors.light.background,
    padding: 7,
    borderRadius: 20,
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: 700,
    marginRight: 8,
    borderWidth: 1.5,
    fontSize: 12,
    borderColor: '#D9D2CD',
  },
  infoSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
}); 