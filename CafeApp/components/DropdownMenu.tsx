import { View, Modal, Pressable, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

// Define the props that this component accepts
type DropdownMenuProps = {
  visible: boolean;      // Controls if menu is shown or hidden
  onClose: () => void;   // Function to call when menu should close
  textColor: string;     // Color for text and icons
  backgroundColor: string; // Background color for menu
};

// Define menu items with their icons and actions
const menuItems = [
  {
    label: 'Settings',
    icon: 'settings' as const,     // This one is correct
    onPress: () => Alert.alert('Settings', 'Settings page coming soon!')
  },
  {
    label: 'Your Friends',
    icon: 'group' as const,        // Changed from 'people' to 'group'
    onPress: () => Alert.alert('Your Friends', 'Report feature coming soon!')
  },
  {
    label: 'Dietary Restrictions',
    icon: 'restaurant' as const,    // This one is correct
    onPress: () => Alert.alert('Report', 'Report feature coming soon!')
  },
  {
    label: 'Set Your Goal For This Year',
    icon: 'track-changes' as const, // Changed from 'target' to 'track-changes'
    onPress: () => Alert.alert('Report', 'Report feature coming soon!')
  },
  {
    label: 'Home City: ',
    icon: 'location-city' as const, // Changed from 'building-library' to 'location-city'
    onPress: () => Alert.alert('Help', 'Help page coming soon!')
  },
  {
    label: 'Help',
    icon: 'help' as const,         // Changed from 'help-outline' to 'help'
    onPress: () => Alert.alert('Help', 'Help page coming soon!')
  },
  {
    label: 'Logout',
    icon: 'logout' as const,       // Changed from 'logout-outline' to 'logout'
    onPress: () => Alert.alert('Help', 'Help page coming soon!')
  },
] as const;

export function DropdownMenu({ visible, onClose, textColor, backgroundColor }: DropdownMenuProps) {
  return (
    // Modal component creates an overlay over the current screen
    <Modal
      transparent        // Makes the modal background see-through
      visible={visible}  // Controls modal visibility
      onRequestClose={onClose}  // Handles back button on Android
      animationType="fade"      // Fade animation when showing/hiding
    >
      {/* Pressable overlay that closes menu when tapped outside */}
      <Pressable 
        style={styles.modalOverlay}
        onPress={onClose}
      >
        {/* Container for menu items */}
        <View style={[styles.dropdown, { backgroundColor }]}>
          {/* Map through menu items to create buttons */}
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed  // Visual feedback when pressed
              ]}
              onPress={() => {
                onClose();        // Close menu
                item.onPress();   // Execute item's action
              }}
            >
              {/* Verify this part is rendering correctly */}
              <MaterialIcons name={item.icon} size={24} color={textColor} />
              {/* Label for menu item */}
              <ThemedText style={[styles.menuItemText, { color: textColor }]}>
                {item.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

// Styles for the menu components
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    position: 'absolute',
    top: 90,          
    right: 16,        
    borderRadius: 8,   
    padding: 8,
    minWidth: 200,
    // Shadow properties for elevation effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,      // Android shadow
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    gap: 12,
  },
  menuItemPressed: {
    opacity: 0.7,
  },
  menuItemText: {
    fontSize: 16,
  },
}); 