import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fraud Face Detector</Text>
      
      <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
        <Text style={styles.btnText}>🌐 साइबर क्राइम पोर्टल</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.btnRed} onPress={() => Linking.openURL('tel:1930')}>
        <Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 40 },
  title: { fontSize: 24, color: '#38bdf8', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  btn: { backgroundColor: '#1e293b', padding: 20, borderRadius: 10, marginBottom: 15 },
  btnRed: { backgroundColor: '#b91c1c', padding: 20, borderRadius: 10, marginBottom: 15 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }
});
    
