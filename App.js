import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as WebBrowser from 'expo-web-browser';

// नोटिफिकेशन कॉन्फ़िगरेशन
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true }),
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // नोटिफिकेशन भेजने का फंक्शन
  useEffect(() => {
    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: { title: "🛡️ Fraud Face Detector", body: "आज ही अपना कोई भी संदिग्ध लिंक यहाँ चेक करें और सुरक्षित रहें!" },
        trigger: { seconds: 3600 }, // हर 1 घंटे में यूजर को अलर्ट जाएगा
      });
    };
    scheduleNotification();
  }, []);

  // बाकी फीचर्स और UI (जो हमने ऊपर डिस्कस किया था)
  if (currentScreen === 'settings') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backBtn}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>⬅ वापस होम पर जाएं</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <TouchableOpacity style={styles.settingCard} onPress={() => Alert.alert("Support", "सपोर्ट के लिए ईमेल करें: help@fraudface.com")}><Text style={styles.settingTitle}>📋 Help & Support</Text></TouchableOpacity>
        <TouchableOpacity style={styles.settingCard} onPress={() => Alert.alert("Rate", "धन्यवाद, हमारी ऐप को 5 स्टार देने के लिए!")}><Text style={styles.settingTitle}>⭐ Rate Us</Text></TouchableOpacity>
        <TouchableOpacity style={styles.settingCard} onPress={() => Alert.alert("Privacy", "आपका डेटा पूरी तरह से सुरक्षित है।")}><Text style={styles.settingTitle}>🔒 Privacy Policy</Text></TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('settings')}><Text style={{fontSize:24}}>⚙️</Text></TouchableOpacity>
      </View>

      {/* मौजूदा 4-5 फीचर्स (ऊपर) */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>मुख्य उपकरण</Text>
        <TouchableOpacity style={styles.btn} onPress={() => WebBrowser.openBrowserAsync('https://cybercrime.gov.in')}><Text style={styles.btnText}>🌐 सरकारी पोर्टल</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL('tel:1930')}><Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text></TouchableOpacity>
      </View>

      {/* नए फीचर्स (नीचे की तरफ) */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>सुरक्षा अलर्ट्स</Text>
        <TouchableOpacity style={styles.newBtn} onPress={() => Alert.alert("Tips", "किसी भी अनजान व्यक्ति को अपनी निजी फोटो या बैंक जानकारी न दें।")}><Text style={styles.btnText}>💡 दैनिक सुरक्षा टिप्स</Text></TouchableOpacity>
        <TouchableOpacity style={styles.newBtn} onPress={() => Alert.alert("News", "लेटेस्ट स्कैम: आजकल 'पार्ट-टाइम जॉब' के नाम पर बहुत ठगी हो रही है, सावधान रहें!")}><Text style={styles.btnText}>📰 लेटेस्ट स्कैम न्यूज़</Text></TouchableOpacity>
        <TouchableOpacity style={styles.newBtn} onPress={() => Alert.alert("Romance", "ऑनलाइन प्यार के जाल में फंसकर पैसे न भेजें।")}><Text style={styles.btnText}>💔 लव ट्रैप से बचें</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#38bdf8' },
  section: { marginBottom: 30 },
  sectionHeader: { color: '#94a3b8', marginBottom: 10, fontSize: 14, fontWeight: 'bold' },
  btn: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, marginBottom: 10 },
  newBtn: { backgroundColor: '#334155', padding: 15, borderRadius: 10, marginBottom: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  settingCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 10, marginBottom: 10 },
  settingTitle: { color: '#fff', fontSize: 16 },
  backBtn: { marginBottom: 20, padding: 10, backgroundColor: '#334155', borderRadius: 8 }
});
    
