import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

export default function App() {
  const [status, setStatus] = useState('Tap below to start AI Deepfake Scan');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const startScan = () => {
    setStatus('Analyzing image features for AI manipulation...');
    setIsLoading(true);
    setScanResult(null);

    setTimeout(() => {
      setIsLoading(false);
      const isFake = Math.random() > 0.5;
      if (isFake) {
        setStatus('⚠️ Warning: Potential Deepfake Detected! (96.4%)');
        setScanResult('deepfake');
      } else {
        setStatus('✅ Result: Authentic Image. Safe to use.');
        setScanResult('safe');
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deepfake Shield</Text>
      
      <View style={styles.box}>
        <Text style={[
          styles.status,
          scanResult === 'deepfake' ? styles.statusDeepfake : null,
          scanResult === 'safe' ? styles.statusSafe : null
        ]}>
          {status}
        </Text>

        {isLoading && <ActivityIndicator size="large" color="#2196F3" style={{ marginVertical: 20 }} />}
      </View>

      <TouchableOpacity 
        style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
        onPress={startScan}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Scanning...' : 'START DEEPFAKE SCAN'}
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
    marginBottom: 40,
  },
  box: {
    width: '100%',
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  status: {
    fontSize: 16,
    color: '#B0BEC5',
    textAlign: 'center',
    lineHeight: 24,
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
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
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
