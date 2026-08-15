import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false }),
});

export default function App() {
  const [inputText, setInputText] = useState('Farji');
  const [linkText, setLinkText] = useState('');
  const [linkResult, setLinkResult] = useState('');
  const [mediaStatus, setMediaStatus] = useState('स्कैनर तैयार है...');

  useEffect(() => {
    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: { title: "सावधान रहें! 🛡️", body: "किसी भी अनजान लिंक पर क्लिक न करें!" },
        trigger: { seconds: 7200 }, 
      });
    };
    scheduleNotification();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Fraud Face Detector</Text>

      {/* पुराने फीचर्स */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛡️ मुख्य सुरक्षा टूल</Text>
        <TouchableOpacity style={styles.blueButton} onPress={() => Linking.openURL('https://cybercrime.gov.in')}><Text style={styles.buttonText}>🌐 साइबर पोर्टल</Text></TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => Linking.openURL('tel:1930')}><Text style={styles.buttonText}>📞 1930 हेल्पलाइन</Text></TouchableOpacity>
        <TouchableOpacity style={styles.purpleButton}><Text style={styles.buttonText}>🏦 बैंक ब्लॉक लिस्ट</Text></TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 AI & स्कैम सुरक्षा</Text>
        <TextInput style={styles.inputBox} value={inputText} onChangeText={setInputText} />
        <TouchableOpacity style={styles.blueButton}><Text style={styles.buttonText}>चेक करें</Text></TouchableOpacity>
      </View>

      <View style={styles.alertCardRed}><Text style={styles.alertTextRed}>💔 लव ट्रैप और डेटिंग फ्रॉड से बचें</Text></View>
      
      {/* नए फीचर्स */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔗 संदिग्ध लिंक स्कैनर (Active)</Text>
        <TextInput style={styles.inputBox} placeholder="लिंक यहाँ पेस्ट करें..." placeholderTextColor="#888" value={linkText} onChangeText={setLinkText} />
        <TouchableOpacity style={styles.blueButton} onPress={checkLink}><Text style={styles.buttonText}>लिंक चेक करें</Text></TouchableOpacity>
        {linkResult ? <Text style={styles.resultText}>{linkResult}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🖼️ मीडिया डीपफेक स्कैनर (Live)</Text>
        <TouchableOpacity style={styles.blueButton} onPress={scanMediaFile}><Text style={styles.buttonText}>📸 फाइल स्कैन करें</Text></TouchableOpacity>
        <Text style={styles.resultText}>{mediaStatus}</Text>
      </View>

      {/* UPI सपोर्ट सेक्शन */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤝 ऐप को सपोर्ट करें (Donate)</Text>
        <Text style={{color: '#fff', marginBottom: 5}}>आपके छोटे से योगदान से यह ऐप और बेहतर बनेगा।</Text>
        <TouchableOpacity style={styles.greenButton} onPress={() => Alert.alert('UPI ID Copy', 'Aashishkevat975@ybl कॉपी कर ली गई है।')}>
          <Text style={styles.buttonText}>UPI ID: Aashishkevat975@ybl</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 फ्रॉड रिपोर्ट दर्ज करें</Text>
        <TextInput style={styles.textArea} placeholder="डिटेल्स लिखें..." />
        <TouchableOpacity style={styles.greenButton}><Text style={styles.buttonText}>सुरक्षित रखें</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// बाकी का कोड वही रहेगा (चेक लिंक और स्कैन मीडिया फंक्शन यहाँ जुड़ जाएंगे)
function checkLink() { /* ... */ }
function scanMediaFile() { /* ... */ }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', padding: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#4cc9f0', marginTop: 30, marginBottom: 15 },
  card: { backgroundColor: '#1c2541', borderRadius: 10, padding: 15, marginBottom: 15 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  blueButton: { backgroundColor: '#0096c7', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  redButton: { backgroundColor: '#d90429', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  purpleButton: { backgroundColor: '#7209b7', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  greenButton: { backgroundColor: '#2b9348', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  inputBox: { backgroundColor: '#0b132b', color: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#3a86ff', marginBottom: 8 },
  textArea: { backgroundColor: '#0b132b', color: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#3a86ff', height: 60, marginBottom: 8 },
  alertCardRed: { backgroundColor: '#1c2541', borderColor: '#d90429', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 15 },
  alertTextRed: { color: '#ff6b6b', fontWeight: 'bold' },
  resultText: { color: '#f39c12', marginTop: 8, fontSize: 13, fontWeight: 'bold' }
});
                                                                                     
