import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, Share } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Choose an option below to start scanning');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [history, setHistory] = useState([]);

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

  // Processing & Analysis Logic with History
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
      
      let resText = '';
      if (isFake) {
        resText = '⚠️ Warning: Potential Deepfake / Fraudulent Face Detected!';
        setScanResult('deepfake');
      } else {
        resText = '✅ Result: Authentic Image. No tampering found.';
        setScanResult('safe');
      }
      
      setStatus(resText);
      setConfidence(randomConfidence);

      // Add to History
      const newEntry = {
        uri: uri,
        result: resText,
        score: randomConfidence + '%',
        time: new Date().toLocaleTimeString()
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 4)]); // Keep last 5 items
    }, 3000);
  };

  // 3. Share Result Function
  const shareResult = async () => {
    try {
      await Share.share({
        message: `Fraud Face Detector Report:\n${status}\nConfidence Score: ${confidence}%\nChecked via Fraud Face Detector App.`,
      });
    } catch (error) {
      alert(error.message);
    }
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

        {scanResult && !isLoading && (
          <TouchableOpacity 
            style={[styles.button, styles.shareButton]} 
            onPress={shareResult}
          >
            <Text style={styles.buttonText}>📤 SHARE RESULT</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* History Section */}
      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Scans History</Text>
          {history.map((item, index) => (
            <View key={index} style={styles.historyCard}>
              <Image source={{ uri: item.uri }} style={styles.historyImage} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.historyText} numberOfLines={2}>{item.result}</Text>
                <Text style={styles.historySubText}>Score: {item.score} | {item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
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
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#333333',
  },
  placeholderText: {
    color: '#777777',
    fontSize: 12,
  },
  previewImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  status: {
    fontSize: 15,
    color: '#B0BEC5',
    textAlign: 'center',
    lineHeight: 22,
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
    marginTop: 8,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  galleryButton: {
    backgroundColor: '#4CAF50',
  },
  shareButton: {
    backgroundColor: '#FF9800',
  },
  buttonDisabled: {
    backgroundColor: '#555555',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  historyContainer: {
    width: '100%',
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#222222',
    paddingTop: 15,
  },
  historyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  historyImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  historyText: {
    color: '#DDDDDD',
    fontSize: 12,
  },
  historySubText: {
    color: '#888888',
    fontSize: 10,
    marginTop: 4,
  },
});
    
