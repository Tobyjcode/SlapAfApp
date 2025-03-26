import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { RAIN_SOUND_URL, FOREST_SOUND_URL, WAVES_SOUND_URL } from '@env';

// firebase sound file URLs
const sounds = [
  {
    id: '1',
    title: 'Rain Sound',
    file: RAIN_SOUND_URL,
  },
  {
    id: '2',
    title: 'Forest Sound',
    file: FOREST_SOUND_URL,
  },
  {
    id: '3',
    title: 'Waves Sound',
    file: WAVES_SOUND_URL,
  },
];

export default function SoundsScreen() {
  const [sound, setSound] = useState(null);
  const [playing, setPlaying] = useState(null);

  // Play a selected sound
  async function playSound(file, title) {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: file });
      setSound(newSound);
      setPlaying(title);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Stop the currently playing sound
  async function stopSound() {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setPlaying(null);
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation Sounds</Text>
      <FlatList
        data={sounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.soundButton}
            onPress={() => playSound(item.file, item.title)}
          >
            <Text style={styles.soundText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      {playing && <Text style={styles.nowPlaying}>Now Playing: {playing}</Text>}
      <Button title="Stop Sound" onPress={stopSound} color="#FF6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  soundButton: {
    backgroundColor: '#87CEEB',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  soundText: {
    fontSize: 18,
    color: '#fff',
  },
  nowPlaying: {
    fontSize: 16,
    fontStyle: 'italic',
    marginVertical: 10,
    color: '#333',
  },
});

