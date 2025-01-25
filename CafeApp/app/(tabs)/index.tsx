import { Image, StyleSheet, Platform, View, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalDropdown } from '@/components/GlobalDropdown';

export default function HomeScreen() {
  // State for controlling menu visibility
  const [showMenu, setShowMenu] = useState(false);
  
  // Get color scheme and set colors based on dark/light mode
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#F3F1EB' : '#958475';
  const backgroundColor = isDark ? '#958475' : '#F3F1EB';

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#F2E8D3', dark: '#F2E8D3'
        }}
        headerHeight={200}
        headerImage={
          <View style={styles.headerContainer}>
            {/* Menu button in header */}
            <View style={styles.fixedHeader}>
              <Pressable
                onPress={() => setShowMenu(true)}  // Show menu when pressed
                style={({ pressed }) => [
                  styles.menuButton,
                  pressed && styles.pressed  // Visual feedback
                ]}
              >
                <MaterialIcons name="menu" size={24} color={textColor} />
              </Pressable>
            </View>
            {/* React logo image */}
            <Image
              source={require('@/assets/images/partial-react-logo.png')}
              style={styles.reactLogo}
            />
          </View>
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12'
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run{' '}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>

      {/* Dropdown menu component */}
      <GlobalDropdown 
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  menuButton: {
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
