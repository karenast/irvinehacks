import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface AddVisitModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, notes: string) => void;
}

export function AddVisitModal({ isVisible, onClose, onSubmit }: AddVisitModalProps) {
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <ThemedView style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <ThemedText style={styles.title}>Rate your visit</ThemedText>
          
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
              >
                <IconSymbol
                  name={star <= rating ? "cup.and.saucer.fill" : "cup.and.saucer"}
                  size={40}
                  color="#958475"
                />
              </TouchableOpacity>
            ))}
          </View>
          <ThemedText style={styles.title}>Any notes?</ThemedText>
          <ScrollView style={styles.notesScrollContainer}>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter your notes here"
              multiline={true}
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                onSubmit(rating, notes);
                onClose();
              }}
            >
              <ThemedText style={styles.buttonText}>Submit</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#958475',
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesText: {
    fontSize: 12,
    marginBottom: 10,
  },
  notesScrollContainer: {
    height: 70,
    width: '80%',
    borderColor: '#958475',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  notesInput: {
    padding: 10,
    textAlignVertical: 'top',
  },
}); 