import { Stack, router } from 'expo-router';
import { Platform, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ 
      headerTitle: '',  // Remove title
      headerBackTitle: '',  // Remove back button text (iOS)
      headerTransparent: true,  // Make header background transparent
      headerLeft: () => (
        <Pressable onPress={() => router.back()}>
          <MaterialIcons 
            name="arrow-back" 
            size={24} 
            color="#958475" 
            style={{ marginLeft: 16 }}
          />
        </Pressable>
      ),
      headerStyle: {
        height: Platform.OS === 'ios' ? 60 : 45,  // Adjust header height
      },
      presentation: 'modal',
    }}>
      <Stack.Screen name="cafe" />
    </Stack>
  );
} 