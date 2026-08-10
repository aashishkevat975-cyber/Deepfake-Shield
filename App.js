import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Tap below to choose a photo for AI Deepfake Scan');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const pickImageAndScan = async () => {
    // गैलरी की परमिशन और फोटो चुनने के लिए
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setStatus('Analyzing image for AI manipulation...');
      setIsLoading(true);
      setScanResult(null);

      // 3 सेकंड की नकली AI स्कैनिंग प्रोसेस
      setTimeout(() => {
        setIsLoading(false);
        const isFake = Math.random() > 0.5;
        if (isFake) {
          setStatus('⚠️ Warning: Potential Deepfake Detected! (97.2%)');
          setScanResult('deepfake');
        } else {
          setStatus('✅ Result: Authentic Image. Safe to use.');
          setScanResult('safe');
        }
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deepfake Shield</Text>
      
      <View style={styles.box}>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}

        <Text style={[
          styles.status,
          scanResult === 'deepfake' ? styles.statusDeepfake : null,
          scanResult === 'safe' ? styles.statusSafe : null
        ]}>
          {status}
        </Text>

        {isLoading && <ActivityIndicator size="large" color="#2196F3" style={{ marginVertical: 15 }} />}
      </View>

      <TouchableOpacity 
        style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
        onPress={pickImageAndScan}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Scanning Photo...' : 'CHOOSE PHOTO & SCAN'}
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
    marginBottom: 20,
  },
  box: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
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
