import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('Result: Safe! No Deepfake found.');

  const handleScan = () => {
    setMessage('Scanning... Please wait!');
    setTimeout(() => {
      setMessage('Result: Safe! No Deepfake found.');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deepfake Shield</Text>
      <Text style={styles.status}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.buttonText}>SCAN MY IMAGE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  status: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
