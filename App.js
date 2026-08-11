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
  
  // Dark Mode का स्टेट
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Switch को बदलने का फंक्शन
  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

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
    }, 2000);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) processImage(result.assets[0].uri);
  };

  return (
    // यहाँ बैकग्राउंड कलर अब स्टेट पर निर्भर करेगा
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F5F5F5' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {currentView === 'scan' && (
          <View style={styles.center}>
            <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>Fraud Face Detector</Text>
            <TouchableOpacity style={styles.button} onPress={pickImage}><Text style={styles.buttonText}>PICK PHOTO</Text></TouchableOpacity>
            {isLoading && <ActivityIndicator size="large" color="#2196F3" />}
            <Text style={styles.text}>{status}</Text>
          </View>
        )}

        {currentView === 'settings' && (
          <View style={styles.center}>
            <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>Settings</Text>
            <View style={styles.card}>
              <Text style={{ color: isDarkMode ? '#FFF' : '#000' }}>Dark Mode</Text>
              <Switch onValueChange={toggleSwitch} value={isDarkMode} />
            </View>
          </View>
        )}

        {currentView === 'contact' && (
          <View style={styles.center}>
            <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>Info</Text>
            <Text style={{ color: isDarkMode ? '#FFF' : '#000' }}>Developed by Aashish Kevat</Text>
          </View>
        )}
      </ScrollView>

      {/* नेविगेशन बार यहाँ है */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setCurrentView('scan')}><Text style={styles.navText}>🔍 Scan</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentView('settings')}><Text style={styles.navText}>⚙️ Settings</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentView('contact')}><Text style={styles.navText}>ℹ️ Info</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  content: { padding: 20 },
  center: { alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, borderTopWidth: 1, borderColor: '#333', backgroundColor: '#1E1E1E' },
  navText: { color: '#FFF', fontSize: 16 },
  card: { backgroundColor: '#333', padding: 15, borderRadius: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { color: '#AAA', marginTop: 10 }
});
                                         
