import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/AuthContext';

import HomeScreen from './src/screens/HomeScreen';
import CategoryTracksScreen from './src/screens/CategoryTracksScreen';
import TrackPlayerScreen from './src/screens/TrackPlayerScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

function Navigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CategoryTracks" component={CategoryTracksScreen} />
            <Stack.Screen name="TrackPlayer" component={TrackPlayerScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;