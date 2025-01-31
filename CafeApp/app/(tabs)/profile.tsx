import React from 'react';
import { StyleSheet, Image, Platform, Pressable, Alert, View, useColorScheme, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState , createContext, useEffect} from 'react';
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
import { auth } from '../../FirebaseConfig';
import { getUsername, updateUsername } from '@/app/(tabs)/database-functions';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser) {
        const fetchedUsername = await getUsername(auth.currentUser.uid);
        setUsername(fetchedUsername ?? '');
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser) {
        const fetchedUsername = await getUsername(auth.currentUser.uid);
        setUsername(fetchedUsername ?? '');
      }
    };
  
    // Add authentication state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/'); // Redirect to sign-in page
      }
    });
  
    fetchUsername();
  
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const [newUsername, setNewUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);

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

  const handleUsernameChange = () => {
    if (newUsername) {
      if (auth.currentUser) {
        updateUsername(auth.currentUser.uid, newUsername);
      }
      setUsername(newUsername);
      setNewUsername('');
      setIsEditingUsername(false);
    }
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#F3F1EB', dark: '#958475' }}
        headerHeight={100}
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
          </View>
        }
      >
      <ThemedView style={styles.profileImageContainer}>
        <Pressable onPress={pickImage}>
              <View style={styles.profileImageWrapper}>
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }}
                    style={styles.headerProfileImage}
                  />
                ) : (
                  <View style={[styles.headerProfileImage, styles.initialsContainer]}>
                    <ThemedText style={styles.headerInitials}>
                      {getInitials(username)}
                    </ThemedText>
                  </View>
                )}
              </View>
            </Pressable>
        </ThemedView>  
        <ThemedView style={[styles.titleContainer, { backgroundColor }]}>
          <ThemedView style={styles.profileInfo}>
                <>
                  <ThemedView style={styles.usernameContainer}>
                    <ThemedText style={[styles.username, { color: textColor }]}>{username}</ThemedText>
                    <Pressable 
                      onPress={() => setIsEditingUsername(true)}
                      style={({ pressed }) => [styles.editIconContainer, pressed && styles.pressed]}
                    >
                      <MaterialIcons name="edit" size={18} color={textColor} />
                    </Pressable>
                  </ThemedView>
                </>
            <ThemedText style={[styles.memberSince, { color: textColor }]}>Member since January 2024</ThemedText>
            <ThemedView style={styles.buttonContainer}>
              <Pressable
                onPress={() => Alert.alert('Edit Profile', 'Edit profile functionality coming soon!')}
                style={({ pressed }) => [
                  styles.button,
                  { 
                    backgroundColor: sideColor,
                    borderColor: textColor,  // Update border color to match text
                    alignContent: 'center',
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
                  auth.signOut();
                  Alert.alert('Signed Out', 'You have been signed out successfully');
                },
              },
            ])}
          >
            <ThemedText style={[styles.signOutText, { color: textColor }]}>Sign Out</ThemedText>
          </Pressable>
        </ThemedView>
      </ParallaxScrollView>

      <Modal
        visible={isEditingUsername}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: backgroundColor }]}>
            <ThemedText style={[styles.modalTitle, { color: textColor }]}>Edit Username</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: textColor }]}
              placeholder="Enter new username"
              placeholderTextColor={textColor}
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TouchableOpacity onPress={handleUsernameChange} style={styles.editbutton}>
              <ThemedText style={styles.editbuttonText}>Save</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditingUsername(false)} style={styles.editbutton}>
              <ThemedText style={styles.editbuttonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },

  headerContainer: {
    height: 400,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
  
  profileImageWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  
  headerInitials: {
    fontSize: 24,
    color: '#fff',
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

  editbutton: {
    backgroundColor: '#958475',
    padding: 10,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
    margin: 5,
  },
  
  editbuttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 20,
    fontWeight: 'bold',
  },

  memberSince: {
    fontSize: 14,
    color: '#958475',
    marginBottom: 16,
  },

  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
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
    justifyContent: 'center',
    alignItems: 'center',
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
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: -120
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIconContainer: {
    marginLeft: 6, // Increase the margin to make the space larger
  },
  usernameText: {
    fontSize: 16,
    color: 'black',
  },
  usernameInput: {
    fontSize: 20,
    color: 'black',
    borderBottomColor: 'black',
  },
  usernameSection: {
    fontSize: 16,
    alignItems: 'center',
  },
});
