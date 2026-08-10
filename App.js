import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [status, setStatus] = useState('Select an image to scan for Deepfake');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null); // 'safe' or 'deepfake'
  const [selectedImage, setSelectedImage] = useState(null);

  // गैलरी खोलने और फोटो चुनने का फंक्शन
  const pickImageAndScan = async () => {
    // गैलरी की परमिशन मांगना
    const { status: permissionStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionStatus !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to scan images!');
      return;
    }

    // गैलरी खोलना
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      startScanning(imageUri);
    } else {
      setStatus('Scan cancelled. Select another image.');
    }
  };

  // स्कैनिंग प्रक्रिया को शुरू करने का फंक्शन
  const startScanning = (imageUri) => {
    setStatus('Analyzing image for Deepfake AI manipulation...');
    setIsLoading(true);
    setScanResult(null);

    // 3 सेकंड का नकली प्रोसेसिंग टाइम (AI Simulation)
    setTimeout(() => {
      setIsLoading(false);
      // रैंडम रिजल्ट (आधा चांस सेफ, आधा चांस डीपफेक - इसे बाद में असली AI API से जोड़ सकते हैं)
      const isDeepfake = Math.random() > 0.5;

      if (isDeepfake) {
        setStatus('⚠️ Warning: Potential Deepfake Detected! (Confidence: 94.2%)');
        setScanResult('deepfake');
      } else {
        setStatus('✅ Result: Authentic Image. No Deepfake found.');
        setScanResult('safe');
      }
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ऐप का हेडर */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={50} color="#64B5F6" />
        <Text style={styles.title}>Deepfake Shield</Text>
      </View>

      {/* चुनी हुई फोटो दिखाने की जगह */}
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderBox}>
            <Ionicons name="image-outline" size={60} color="#757575" />
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}
      </View>

      {/* स्टेटस और रिजल्ट */}
      <Text style={[
        styles.status,
        scanResult === 'deepfake' ? styles.statusDeepfake : null,
        scanResult === 'safe' ? styles.statusSafe : null
      ]}>
        {status}
      </Text>

      {/* लोडिंग इंडिकेटर */}
      {isLoading && <ActivityIndicator size="large" color="#2196F3" style={{ marginVertical: 15 }} />}

      {/* गैलरी खोलने और स्कैन करने वाला बटन */}
      <TouchableOpacity
        style={[styles.button, isLoading ? styles.buttonDisabled : null]}
        onPress={pickImageAndScan}
        disabled={isLoading}
      >
        <Ionicons name="folder-open" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>
          {isLoading ? 'Scanning...' : 'CHOOSE IMAGE & SCAN'}
        </Text>
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  imageContainer: {
    width: 240,
    height: 240,
    borderRadius: 15,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333333',
    marginVertical: 15,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholderBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#757575',
    fontSize: 14,
    marginTop: 8,
  },
  status: {
    fontSize: 16,
    color: '#B0BEC5',
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
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
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
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
        
