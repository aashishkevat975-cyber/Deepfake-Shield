import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {
  const [status, setStatus] = useState('Tap below to scan an image');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScanSimulation = () => {
    setStatus('Scanning image for Deepfake...');
    setIsLoading(true);
    setScanResult(null);

    setTimeout(() => {
      setIsLoading(false);
      const isFake = Math.random() > 0.5;
      if (isFake) {
        setStatus('⚠️ Alert: Potential Deepfake Detected!');
        setScanResult('deepfake');
      } else {
        setStatus('✅ Result: Safe! No Deepfake found.');
        setScanResult('safe');
      }
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deepfake Shield</Text>
      
      <Text style={[
        styles.status,
        scanResult === 'deepfake' ? styles.statusDeepfake : null,
        scanResult === 'safe' ? styles.statusSafe : null
      ]}>
        {status}
      </Text>

      {isLoading && <ActivityIndicator size="large" color="#2196F3" style={{ marginVertical: 20 }} />}

      <TouchableOpacity 
        style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
        onPress={handleScanSimulation}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Processing...' : 'SCAN MY IMAGE'}
        </Text>
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
    color: '#B0BEC5',
    textAlign: 'center',
    marginBottom: 20,
    minHeight: 50,
  },
  statusSafe: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statusDeepfake: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#555555',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
