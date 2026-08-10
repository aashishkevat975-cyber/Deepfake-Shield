import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [status, setStatus] = useState('Tap below to select an image from your gallery');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // गैलरी खोलने और फोटो चुनने का असली फंक्शन
  const pickImageFromGallery = async () => {
    try {
      // परमिशन मांगना
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Camera roll permission is required to select images!');
        return;
      }

      // गैलरी खोलना
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        startDeepfakeScan(imageUri);
      } else {
        setStatus('Selection cancelled.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while opening the gallery.');
    }
  };

  // स्कैनिंग और रिजल्ट दिखाने का फंक्शन
  const startDeepfakeScan = (uri) => {
    setStatus('Analyzing image for AI manipulation...');
    setIsLoading(true);
    setScanResult(null);

    setTimeout(() => {
      setIsLoading(false);
      // यहाँ आप भविष्य में किसी असली AI API का रिजल्ट जोड़ सकते हैं
      const isFake = Math.random() > 0.5;

      if (isFake) {
        setStatus('⚠️ Warning: Potential Deepfake Detected!');
        setScanResult('deepfake');
      } else {
        setStatus('✅ Result: Safe! Authentic Image.');
        setScanResult('safe');
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={44} color="#64B5F6" />
        <Text style={styles.title}>Deepfake Shield</Text>
      </View>

      {/* चुनी गई फोटो स्क्रीन पर दिखाने की जगह */}
      <View style={styles.imagePreviewBox}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.imageStyle} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="image-outline" size={50} color="#757575" />
            <Text style={styles.placeholderText}>No image chosen</Text>
          </View>
        )}
      </View>

      <Text style={[
        styles.statusText,
        scanResult === 'deepfake' ? styles.alertText : null,
        scanResult === 'safe' ? styles.safeText : null
      ]}>
        {status}
      </Text>

      {isLoading && <ActivityIndicator size="large" color="#2196F3" style={{ marginVertical: 15 }} />}

      <TouchableOpacity 
        style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
        onPress={pickImageFromGallery}
        disabled={isLoading}
      >
        <Ionicons name="folder-open-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>
          {isLoading ? 'Processing...' : 'CHOOSE & SCAN IMAGE'}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  imagePreviewBox: {
    width: 220,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333333',
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#757575',
    fontSize: 14,
    marginTop: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#B0BEC5',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    minHeight: 45,
  },
  safeText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  alertText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
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
    
