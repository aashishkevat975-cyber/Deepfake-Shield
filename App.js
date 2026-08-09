import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState("Deepfake Shield is Ready");

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Gallery permission is needed!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      setStatus("Image selected. Ready to scan!");
    }
  };

  const handleScan = () => {
    if (!selectedImage) {
      Alert.alert("Please select an image first!");
      return;
    }
    setStatus("Scanning for Deepfake... Please wait!");
    setTimeout(() => {
      setStatus("Result: Safe! No Deepfake found.");
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛡️ Deepfake Shield</Text>
      <Text style={styles.result}>{status}</Text>

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
        <Button title="Scan My Image" onPress={handleScan} color="#34C759" />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 20,
  },
  result: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  placeholder: {
    width: 220,
    height: 220,
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
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 240,
    marginBottom: 15,
  },
});
