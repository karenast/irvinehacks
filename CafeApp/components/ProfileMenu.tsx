import { View, Modal, Pressable, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

type ProfileMenuProps = {
  visible: boolean;
  onClose: () => void;
  textColor: string;
  backgroundColor: string;
};

const menuItems = [
  {
    label: 'Settings',
    icon: 'settings' as const,
    onPress: () => Alert.alert('Settings', 'Settings page coming soon!')
  },
  {
    label: 'Help',
    icon: 'help-outline' as const,
    onPress: () => Alert.alert('Help', 'Help page coming soon!')
  },
  {
    label: 'Report a Problem',
    icon: 'report-problem' as const,
    onPress: () => Alert.alert('Report', 'Report feature coming soon!')
  }
] as const;

export function ProfileMenu({ visible, onClose, textColor, backgroundColor }: ProfileMenuProps) {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <Pressable 
        style={styles.modalOverlay}
        onPress={onClose}
      >
        <View style={[styles.dropdown, { backgroundColor }]}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed
              ]}
              onPress={() => {
                onClose();
                item.onPress();
              }}
            >
              <MaterialIcons name={item.icon} size={24} color={textColor} />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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