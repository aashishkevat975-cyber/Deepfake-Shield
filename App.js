import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [status, setStatus] = useState('Ready to scan.');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // गैलरी खोलने और फोटो चुनने का फंक्शन
  const pickImageAndScan = async () => {
    const { status: permissionStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionStatus !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      startScanning(selectedImageUri);
    } else {
      setStatus('Scan cancelled.');
      setScanResult(null);
    }
  };

  // स्कैनिंग प्रक्रिया को सिमुलेट करने का फंक्शन
  const startScanning = (imageUri) => {
    setStatus('Scanning... Please wait!');
    setIsLoading(true);
    setScanResult(null);

    setTimeout(() => {
      setIsLoading(false);
      const isDeepfake = Math.random() > 0.5;

      if (isDeepfake) {
        setStatus('⚠️ Alert: Potential Deepfake Detected!');
        setScanResult('deepfake');
      } else {
        setStatus('Result: Safe! No Deepfake found.');
        setScanResult('safe');
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={48} color="#64B5F6" />
        <Text style={styles.title}>Deepfake Shield</Text>
      </View>

      <Text style={[
        styles.status,
        scanResult === 'deepfake' ? styles.statusDeepfake : null,
        scanResult === 'safe' ? styles.statusSafe : null
      ]}>
        {status}
      </Text>

      {isLoading && <ActivityIndicator size="large" color="#64B5F6" style={{ marginVertical: 20 }} />}

      <TouchableOpacity
        style={[styles.button, isLoading ? styles.buttonDisabled : null]}
        onPress={pickImageAndScan}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 15,
  },
  status: {
    fontSize: 18,
    color: '#B0BEC5',
    textAlign: 'center',
    marginVertical: 20,
    minHeight: 60,
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
    elevation: 3,
    marginVertical: 20,
  },
  buttonDisabled: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
    
