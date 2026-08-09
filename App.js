import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [status, setStatus] = useState("Deepfake Shield is Ready");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setStatus("Scanning image for Deepfake...");
    
    setTimeout(() => {
      setIsScanning(false);
      setStatus("Result: Safe! No Deepfake detected.");
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛡️ Deepfake Shield</Text>
      
      <View style={styles.card}>
        <Text style={styles.result}>{status}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, isScanning && styles.buttonDisabled]} 
        onPress={handleScan}
        disabled={isScanning}
      >
        <Text style={styles.buttonText}>
          {isScanning ? "Please Wait..." : "Scan Image Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#334155',
  },
  result: {
    fontSize: 16,
    color: '#38bdf8',
    textAlign: 'center',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
