import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome to Slap Af</Text>
      <Button title="Toggle Dark Mode" onPress={() => setIsDarkMode(!isDarkMode)} />
      <Button title="Go to Meditation" onPress={() => navigation.navigate('Meditation')} />
      <Button title="Go to Breathing" onPress={() => navigation.navigate('Breathing')} />
      <Button title="Go to Sounds" onPress={() => navigation.navigate('Sounds')} />
      <Button title="Go to Spotify Playlist" onPress={() => navigation.navigate('Spotify Playlist')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});