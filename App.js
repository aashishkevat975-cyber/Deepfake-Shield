import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultText, setResultText] = useState('Deepfake Shield is Ready');

  // फोटो या वीडियो चुनने का फंक्शन
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Gallery permission is needed to select photos!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      setResultText('Image selected. Ready to scan.');
    }
  };

  // डीपफेक स्कैन करने का फंक्शन (यहाँ आप बाद में अपनी AI API जोड़ेंगे)
  const scanImage = () => {
    if (!selectedImage) {
      Alert.alert("Please select an image first!");
      return;
    }
    setResultText('Scanning for Deepfake... Please wait.');
    
    // अभी के लिए यह टेस्ट रिजल्ट दिखाएगा
    setTimeout(() => {
      setResultText('Result: Safe! No Deepfake detected.');
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛡️ Deepfake Shield</Text>
      <Text style={styles.subtitle}>{resultText}</Text>

      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image Selected</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Select Photo from Gallery" onPress={pickImage} color="#007AFF" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Scan for Deepfake" onPress={scanImage} color="#34C759" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#334155',
  },
  placeholderText: {
    color: '#64748b',
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 250,
    marginBottom: 15,
  },
});
    
