import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MeditationScreen from './screens/MeditationScreen';
import BreathingScreen from './screens/BreathingScreen';
import SoundsScreen from './screens/SoundsScreen';
import SettingsScreen from './screens/SettingsScreen';
import SpotifyPlaylistScreen from './screens/SpotifyPlaylistScreen'; // Import Spotify screen

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Meditation" component={MeditationScreen} />
        <Stack.Screen name="Breathing" component={BreathingScreen} />
        <Stack.Screen name="Sounds" component={SoundsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Spotify Playlist" component={SpotifyPlaylistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}