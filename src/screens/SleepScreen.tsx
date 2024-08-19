// SleepScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SleepScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Tracks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a202c',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});