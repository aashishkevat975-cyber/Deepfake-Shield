import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [status, setStatus] = useState("Deepfake Shield is Ready");

  const handleScan = () => {
    setStatus("Scanning... Please wait!");
    setTimeout(() => {
      setStatus("Result: Safe! No Deepfake found.");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛡️ Deepfake Shield</Text>
      <Text style={styles.result}>{status}</Text>
      <Button title="Scan My Image" onPress={handleScan} color="#38bdf8" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, color: '#fff', marginBottom: 20 },
  result: { fontSize: 18, color: '#94a3b8', marginBottom: 20 }
});
