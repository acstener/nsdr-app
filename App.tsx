import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { LogBox } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import CategoryTracksScreen from './src/screens/CategoryTracksScreen';
import TrackPlayerScreen from './src/screens/TrackPlayerScreen';

// Ignore specific warnings
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

const Stack = createStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        // App is in background
        TrackPlayer.pause();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
          />
          <Stack.Screen 
            name="CategoryTracks" 
            component={CategoryTracksScreen}
          />
          <Stack.Screen 
            name="TrackPlayer" 
            component={TrackPlayerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;