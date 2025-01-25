import { StyleSheet, Image, Platform, Pressable, Alert, View, useColorScheme, Modal, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
//import { RadioButton } from 'react-native-paper'; 

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  Lists: { initialTab: 'Been' | 'Want to Try' | 'Recs' };
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colorScheme = useColorScheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [friendsCount, setFriendsCount] = useState(0);
  const [goal, setGoal] = useState('20');
  const [showMenu, setShowMenu] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#F3F1EB' : '#958475';
  const backgroundColor = isDark ? '#958475' : '#F3F1EB';
  const sideColor = isDark ? '#958475' : '#F3F1EB';

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Needed',
        'Sorry, we need camera roll permissions to change your profile picture.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
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
  ];

  const handleCustomGoal = () => {
    if (customGoal) {
      setGoal(customGoal);
      setShowCustomInput(false);
    }
  };

  const navigateToList = (filter: string) => {
    router.push({
      pathname: '/list',
      params: { filter }
    });
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#F3F1EB', dark: '#958475' }}
        headerHeight={200}
        headerImage={
          <View style={styles.headerContainer}>
            <View style={styles.fixedHeader}>
              <Pressable
                onPress={() => setShowMenu(true)}
                style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
              >
                <MaterialIcons name="menu" size={24} color={textColor} />
              </Pressable>
            </View>
            <Pressable onPress={pickImage}>
              <View style={styles.profileImageContainer}>
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }}
                    style={styles.headerProfileImage}
                  />
                ) : (
                  <View style={[styles.headerProfileImage, styles.initialsContainer]}>
                    <ThemedText style={styles.headerInitials}>
                      {getInitials("John Doe")}
                    </ThemedText>
                  </View>
                )}
                <View style={styles.editOverlay}>
                  <MaterialIcons name="photo-camera" size={24} color="#fff" />
                </View>
              </View>
            </Pressable>
          </View>
        }
      >
        <ThemedView style={[styles.titleContainer, { backgroundColor }]}>
          <ThemedView style={styles.profileInfo}>
            <ThemedText style={[styles.username, { color: textColor }]}>Username</ThemedText>
            <ThemedText style={[styles.memberSince, { color: textColor }]}>Member since January 2024</ThemedText>
            <ThemedView style={styles.buttonContainer}>
              <Pressable 
                onPress={() => Alert.alert('Edit Profile', 'Edit profile functionality coming soon!')}
                style={({ pressed }) => [
                  styles.button,
                  { 
                    backgroundColor: sideColor,
                    borderColor: textColor  // Update border color to match text
                  },
                  pressed && styles.pressed
                ]}
              >
                <ThemedText style={[styles.buttonText, { color: textColor }]}>Edit profile</ThemedText>
              </Pressable>
              <Pressable 
                onPress={() => Alert.alert('Share Profile', 'Share profile functionality coming soon!')}
                style={({ pressed }) => [
                  styles.button,
                  { 
                    backgroundColor: sideColor,
                    borderColor: textColor  // Update border color to match text
                  },
                  pressed && styles.pressed
                ]}
              >
                <ThemedText style={[styles.buttonText, { color: textColor }]}>Share profile</ThemedText>
              </Pressable>
            </ThemedView>

            <ThemedView style={styles.statsContainer}>
              <Pressable 
                style={styles.statItem}
                onPress={() => Alert.alert('Friends', 'Show friends list')}
              >
                <ThemedText style={[styles.statNumber, { color: textColor }]}>{friendsCount}</ThemedText>
                <ThemedText style={[styles.statLabel, { color: textColor }]}>Friends</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.listSection}>
          <Pressable 
            style={({ pressed }) => [
              styles.listItem,
              { backgroundColor: sideColor },
              pressed && styles.pressed
            ]}
            onPress={() => navigateToList('been')}
          >
            <ThemedView style={styles.listItemLeft}>
              <MaterialIcons name="local-cafe" size={24} color={textColor} />
              <ThemedText style={[styles.listItemText, { color: textColor }]}>Been</ThemedText>
            </ThemedView>
            <ThemedView style={styles.listItemRight}>
              <ThemedText style={[styles.countText, { color: textColor }]}>0</ThemedText>
              <MaterialIcons name="chevron-right" size={24} color={textColor} />
            </ThemedView>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.listItem,
              { backgroundColor: sideColor },
              pressed && styles.pressed
            ]}
            onPress={() => navigateToList('wantToTry')}
          >
            <ThemedView style={styles.listItemLeft}>
              <MaterialIcons name="location-on" size={24} color={textColor} />
              <ThemedText style={[styles.listItemText, { color: textColor }]}>Want to Try</ThemedText>
            </ThemedView>
            <ThemedView style={styles.listItemRight}>
              <ThemedText style={[styles.countText, { color: textColor }]}>0</ThemedText>
              <MaterialIcons name="chevron-right" size={24} color={textColor} />
            </ThemedView>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.listItem,
              { backgroundColor: sideColor },
              pressed && styles.pressed
            ]}
            onPress={() => navigateToList('recommendations')}
          >
            <ThemedView style={styles.listItemLeft}>
              <MaterialIcons name="storefront" size={24} color={textColor} />
              <ThemedText style={[styles.listItemText, { color: textColor }]}>Recs for You</ThemedText>
            </ThemedView>
            <ThemedView style={styles.listItemRight}>
              <ThemedText style={[styles.countText, { color: textColor }]}>0</ThemedText>
              <MaterialIcons name="chevron-right" size={24} color={textColor} />
            </ThemedView>
          </Pressable>
        </ThemedView>

        <ThemedView style={[styles.goalContainer, { backgroundColor: sideColor }]}>
          <View style={styles.goalHeader}>
            <ThemedText style={[styles.goalTitle, { color: textColor }]}>Set your 2025 goal</ThemedText>
            <ThemedText style={[styles.goalSubtitle, { color: textColor }]}>
              How many restaurants do you want to try in 2025?
            </ThemedText>
          </View>
          
          <View style={styles.radioGroup}>
            {['20', '50', '100'].map((value) => (
              <Pressable
                key={value}
                style={[
                  styles.radioButton,
                  { 
                    backgroundColor: sideColor,
                    borderColor: textColor,
                    opacity: goal === value ? 1 : 0.7
                  }
                ]}
                onPress={() => {
                  setGoal(value);
                  setShowCustomInput(false);
                }}
              >
                <ThemedText style={[styles.radioText, { color: textColor }]}>{value}</ThemedText>
              </Pressable>
            ))}
            {showCustomInput ? (
              <TextInput
                style={[
                  styles.radioButton,
                  styles.customizeInput,
                  { 
                    backgroundColor: sideColor,
                    borderColor: textColor,
                    color: textColor
                  }
                ]}
                placeholder="Enter"
                placeholderTextColor={textColor}
                keyboardType="numeric"
                value={customGoal}
                onChangeText={setCustomGoal}
                onSubmitEditing={handleCustomGoal}
                autoFocus
                onBlur={() => {
                  if (!customGoal) setShowCustomInput(false);
                }}
              />
            ) : (
              <Pressable
                style={[
                  styles.radioButton,
                  { 
                    backgroundColor: sideColor,
                    borderColor: textColor,
                    opacity: 0.7
                  }
                ]}
                onPress={() => setShowCustomInput(true)}
              >
                <ThemedText style={[styles.radioText, { color: textColor }]}>Customize</ThemedText>
              </Pressable>
            )}
          </View>
        </ThemedView>

        <ThemedView style={styles.signOutContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.signOutButton,
              { 
                backgroundColor: sideColor,
                borderColor: textColor
              },
              pressed && styles.pressed
            ]}
            onPress={() => Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Sign Out',
                style: 'destructive',
                onPress: () => {
                  // Add sign out logic here
                  Alert.alert('Signed Out', 'You have been signed out successfully');
                },
              },
            ])}
          >
            <ThemedText style={[styles.signOutText, { color: textColor }]}>Sign Out</ThemedText>
          </Pressable>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  headerProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  
  headerInitials: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#958475',
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  IconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start',
    gap: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    gap: 8,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },

  pressed: {
    opacity: 0.7,
  },

  buttonText: {
    fontSize: 14,
  },

  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },

  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: '#958475',
  },

  memberSince: {
    fontSize: 14,
    color: '#958475',
    marginBottom: 16,
  },

  profileImageContainer: {
    position: 'relative',
  },

  editOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listSection: {
    marginTop: 24,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginHorizontal: -16,
  },

  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  listItemText: {
    fontSize: 16,
    color: '#958475',
  },

  countText: {
    fontSize: 16,
    color: '#958475',
  },

  listItemDisabled: {
    opacity: 0.5,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 20,
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
  },

  signOutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },

  signOutButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
  },

  signOutText: {
    fontSize: 16,
    fontWeight: '500',
  },

  goalContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  
  goalHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },

  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },

  goalSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
    maxWidth: '80%',
  },

  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },

  radioButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },

  radioText: {
    fontSize: 14,
    fontWeight: '500',
  },

  initialsContainer: {
    backgroundColor: '#F3F1EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fixedHeader: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1000,
  },

  menuButton: {
    padding: 8,
    borderRadius: 20,
  },

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

  customizeInput: {
    minWidth: 80,
    textAlign: 'center',
    padding: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});
