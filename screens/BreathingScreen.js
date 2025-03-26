import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function BreathingScreen() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [breathStage, setBreathStage] = useState('Breathe In'); // Breathing stages
  const [scale] = useState(new Animated.Value(1)); // Animation scale for breathing circle

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Breathing animation Breathe In -> Hold -> Breathe Out
    const cycle = () => {
      setBreathStage('Breathe In');
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setBreathStage('Breathe Out');
        cycle();
      });
    };

    cycle();
  }, [scale]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{breathStage}</Text>
      <Animated.View
        style={[
          styles.breathingCircle,
          { transform: [{ scale }] },
        ]}
      />
      <Text style={styles.timer}>{timeLeft} seconds remaining</Text>
      <Text style={styles.text}>Relax and follow the breathing guide.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3eafd', 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#084B83',
    marginBottom: 20,
  },
  breathingCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#a2d2ff',
    marginBottom: 20,
  },
  timer: {
    fontSize: 18,
    color: '#084B83',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#084B83',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
