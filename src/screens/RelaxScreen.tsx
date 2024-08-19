// RelaxScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RelaxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relax Tracks</Text>
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