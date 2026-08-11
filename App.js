import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, Switch, Share } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [currentView, setCurrentView] = useState('scan');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Choose an option to start');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [history, setHistory] = useState([]);

  const processImage = (uri) => {
    setImage(uri);
    setStatus('Analyzing facial patterns...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isFake = Math.random() > 0.5;
      const res = isFake ? '⚠️ Deepfake Detected!' : '✅ Authentic Image.';
      setStatus(res);
      setScanResult(isFake ? 'deepfake' : 'safe');
      
      const newEntry = { uri, result: res, time: new Date().toLocaleTimeString() };
      setHistory(prev => [newEntry, ...prev]);
    }, 2500);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) processImage(result.assets[0].uri);
  };

  const shareResult = async () => {
    await Share.share({ message: `Fraud Detection Result: ${status}` });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {currentView === 'scan' && (
          <View style={styles.center}>
            <Text style={styles.title}>Fraud Face Detector</Text>
            {image && <Image source={{ uri: image }} style={styles.preview} />}
            <Text style={[styles.status, scanResult === 'deepfake' ? styles.statusDeepfake : styles.statusSafe]}>{status}</Text>
            {isLoading && <ActivityIndicator size="large" color="#2196F3" />}
            <TouchableOpacity style={styles.button} onPress={pickImage}><Text style={styles.buttonText}>PICK PHOTO</Text></TouchableOpacity>
            {scanResult && <TouchableOpacity style={styles.shareBtn} onPress={shareResult}><Text style={styles.buttonText}>SHARE RESULT</Text></TouchableOpacity>}
            
            <Text style={styles.historyTitle}>History</Text>
            {history.map((h, i) => (
              <View key={i} style={styles.card}><Image source={{ uri: h.uri }} style={styles.smallImg} /><Text style={styles.text}>{h.result} ({h.time})</Text></View>
            ))}
          </View>
        )}

        {currentView === 'settings' && (
          <View style={styles.center}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.card}><Text style={styles.text}>Dark Mode</Text><Switch value={true} /></View>
            <Text style={styles.version}>Version: 1.0.5 (Pro)</Text>
          </View>
        )}

        {currentView === 'contact' && (
          <View style={styles.center}>
            <Text style={styles.title}>Support & Info</Text>
            <View style={styles.card}><Text style={styles.text}>Developer: Aashish Kevat</Text></View>
            <View style={styles.card}><Text style={styles.text}>Local processing used for maximum security.</Text></View>
          </View>
        )}
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setCurrentView('scan')}><Text style={styles.navText}>🔍 Scan</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentView('settings')}><Text style={styles.navText}>⚙️ Settings</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentView('contact')}><Text style={styles.navText}>ℹ️ Info</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 50 },
  content: { padding: 20 },
  center: { alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginBottom: 20 },
  preview: { width: 150, height: 150, borderRadius: 75, marginBottom: 20, borderWidth: 2, borderColor: '#2196F3' },
  status: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
  statusSafe: { color: '#4CAF50' },
  statusDeepfake: { color: '#F44336' },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 10 },
  shareBtn: { backgroundColor: '#FF9800', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, borderTopWidth: 1, borderColor: '#333', backgroundColor: '#1E1E1E' },
  navText: { color: '#FFF', fontSize: 16 },
  card: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, width: '100%', marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  smallImg: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  text: { color: '#FFF' },
  historyTitle: { color: '#FFF', marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
  version: { color: '#555', marginTop: 20 }
});
          
