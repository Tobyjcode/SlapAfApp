import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const meditations = [
  { id: '1', title: '5-Minute Relaxation' },
  { id: '2', title: 'Morning Focus' },
  { id: '3', title: 'Sleep Aid' },
];

export default function MeditationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation Options</Text>
      <FlatList
        data={meditations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MeditationDetail', { id: item.id })}>
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
