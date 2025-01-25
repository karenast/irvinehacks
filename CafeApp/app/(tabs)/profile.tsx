import { StyleSheet, Image, Platform, Pressable, Alert, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialIcons } from '@expo/vector-icons';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function TabTwoScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F2E8D3', dark: '#F2E8D3' }}
      headerImage={
        <IconSymbol
          size={310}
          color="958475"
          name="chevron.left.forwardslash.chevron.right" // Updated icon name
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedView style={styles.profileInfo}>
          <Pressable 
            onPress={() => {
              Alert.alert('Change Profile Picture', 'This feature will be available soon!');
            }}
          >
            <View style={styles.profileImageContainer}>
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={[styles.profileImage, styles.initialsContainer]}>
                  <ThemedText style={styles.initials}>
                    {getInitials("John Doe")} {/* Replace with actual user name */}
                  </ThemedText>
                </View>
              )}
              <View style={styles.editOverlay}>
                <MaterialIcons name="photo-camera" size={24} color="#fff" />
              </View>
            </View>
          </Pressable>
          <ThemedText style={styles.username}>Username</ThemedText>
          <ThemedText style={styles.memberSince}>Member since January 2024</ThemedText>
          <ThemedView style={styles.buttonContainer}>
            <Pressable 
              onPress={() => Alert.alert('Edit Profile', 'Edit profile functionality coming soon!')}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed
              ]}
            >
              <ThemedText style={styles.buttonText}>Edit profile</ThemedText>
            </Pressable>
            <Pressable 
              onPress={() => Alert.alert('Share Profile', 'Share profile functionality coming soon!')}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed
              ]}
            >
              <ThemedText style={styles.buttonText}>Share profile</ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedView style={styles.statsContainer}>
            <Pressable 
              style={styles.statItem}
              onPress={() => Alert.alert('Followers', 'Show followers list')}
            >
              <ThemedText style={styles.statNumber}>{followersCount}</ThemedText>
              <ThemedText style={styles.statLabel}>Followers</ThemedText>
            </Pressable>
            <Pressable 
              style={styles.statItem}
              onPress={() => Alert.alert('Following', 'Show following list')}
            >
              <ThemedText style={styles.statNumber}>{followingCount}</ThemedText>
              <ThemedText style={styles.statLabel}>Following</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.listSection}>
        <Pressable 
          style={({ pressed }) => [
            styles.listItem,
            pressed && styles.pressed
          ]}
          onPress={() => Alert.alert('Been', 'Show visited cafes')}
        >
          <ThemedView style={styles.listItemLeft}>
            <MaterialIcons name="check-circle" size={24} color="#958475" />
            <ThemedText style={styles.listItemText}>Been</ThemedText>
          </ThemedView>
          <ThemedView style={styles.listItemRight}>
            <ThemedText style={styles.countText}>0</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color="#958475" />
          </ThemedView>
        </Pressable>

        <Pressable 
          style={({ pressed }) => [
            styles.listItem,
            pressed && styles.pressed
          ]}
          onPress={() => Alert.alert('Want to Try', 'Show wishlist cafes')}
        >
          <ThemedView style={styles.listItemLeft}>
            <MaterialIcons name="bookmark" size={24} color="#958475" />
            <ThemedText style={styles.listItemText}>Want to Try</ThemedText>
          </ThemedView>
          <ThemedView style={styles.listItemRight}>
            <ThemedText style={styles.countText}>0</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color="#958475" />
          </ThemedView>
        </Pressable>

        <Pressable 
          style={({ pressed }) => [
            styles.listItem,
            styles.listItemDisabled,
            pressed && styles.pressed
          ]}
          disabled={true}
        >
          <ThemedView style={styles.listItemLeft}>
            <MaterialIcons name="favorite" size={24} color="#CCCCCC" />
            <ThemedText style={[styles.listItemText, styles.textDisabled]}>Recs for You</ThemedText>
          </ThemedView>
          <MaterialIcons name="lock" size={20} color="#CCCCCC" />
        </Pressable>
      </ThemedView>

      <ThemedText>Member since @certain date.</ThemedText>
      <Collapsible title="Been">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/profile.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Want to Try">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Recs For You">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  pressed: {
    opacity: 0.7,
  },

  buttonText: {
    fontSize: 14,
    color: '#000',
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
  },

  memberSince: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },

  profileImageContainer: {
    position: 'relative',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  initialsContainer: {
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  initials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#666',
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
    borderBottomColor: '#958475',
    backgroundColor: '#958475',
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
    color: '#F3F1EB',
  },

  countText: {
    fontSize: 16,
    color: '#958475',
  },

  listItemDisabled: {
    opacity: 0.5,
  },

  textDisabled: {
    color: '#FFFFFF',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    color: '#666',
  },
});
