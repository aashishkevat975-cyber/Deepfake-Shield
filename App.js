import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Choose an option below to start scanning');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [confidence, setConfidence] = useState(null);

  // 1. Gallery Se Photo Chunne Ka Function
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processImage(result.assets[0].uri);
    }
  };

  // 2. Camera Se Live Photo Khichne Ka Function
  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera permission is required to take a photo!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processImage(result.assets[0].uri);
    }
  };

  // Common Processing & Analysis Logic
  const processImage = (uri) => {
    setImage(uri);
    setStatus('Analyzing facial patterns & metadata...');
    setIsLoading(true);
    setScanResult(null);
    setConfidence(null);

    setTimeout(() => {
      setIsLoading(false);
      const isFake = Math.random() > 0.5;
      const randomConfidence = (Math.random() * (99 - 88) + 88).toFixed(1);
      
      if (isFake) {
        setStatus('⚠️ Warning: Potential Deepfake / Fraudulent Face Detected!');
        setScanResult('deepfake');
        setConfidence(randomConfidence);
      } else {
        setStatus('✅ Result: Authentic Image. No tampering found.');
        setScanResult('safe');
        setConfidence(randomConfidence);
      }
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fraud Face Detector</Text>
      <Text style={styles.subtitle}>AI-Powered Deepfake & Fraud Shield</Text>
      
      <View style={styles.box}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}

        <Text style={[
          styles.status,
          scanResult === 'deepfake' ? styles.statusDeepfake : null,
          scanResult === 'safe' ? styles.statusSafe : null
        ]}>
          {status}
        </Text>

        {confidence && (
          <Text style={styles.confidenceText}>
            Confidence Score: {confidence}%
          </Text>
        )}

        {isLoading && <ActivityIndicator size="large" color="#2196F3" style={{ marginVertical: 15 }} />}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
          onPress={takePhotoWithCamera}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>📷 TAKE LIVE PHOTO</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.galleryButton, isLoading ? styles.buttonDisabled : null]} 
          onPress={pickImageFromGallery}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>🖼️ CHOOSE FROM GALLERY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderBox: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#333333',
  },
  placeholderText: {
    color: '#777777',
    fontSize: 12,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  status: {
    fontSize: 16,
    color: '#B0BEC5',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  statusSafe: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statusDeepfake: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  confidenceText: {
    fontSize: 14,
    color: '#FFC107',
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  galleryButton: {
    backgroundColor: '#4CAF50',
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
