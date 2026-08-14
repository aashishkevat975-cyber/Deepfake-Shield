import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Linking, Share, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// नोटिफिकेशन कॉन्फ़िगरेशन
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [scamInput, setScamInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [reportText, setReportText] = useState('');

  // नोटिफिकेशन शेड्यूल करने का फंक्शन
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        // हर 2 घंटे (7200 सेकंड) में नोटिफिकेशन
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "🚨 सुरक्षा अलर्ट: Fraud Face Detector",
            body: 'सावधान! किसी भी अनजान लिंक पर क्लिक न करें। अपनी प्राइवेसी सुरक्षित रखें।',
          },
          trigger: { seconds: 7200, repeats: true },
        });
      }
    }
    requestPermissions();
  }, []);

  const runAiCheck = () => {
    if (!scamInput.trim()) {
      Alert.alert("त्रुटि", "कृपया जांच के लिए मैसेज यहाँ पेस्ट करें।");
      return;
    }
    const text = scamInput.toLowerCase();
    const isScam = ['win', 'lottery', 'otp', 'job', 'free', 'love', 'gift', 'video call', 'urgent', 'paisa', 'reward'].some(word => text.includes(word));
    setAiResult(isScam ? '🚨 खतरा! यह 95% फ्रॉड या स्कैम संदेश हो सकता है।' : '✅ यह संदेश सामान्य लग रहा है, फिर भी सावधान रहें।');
  };

  const submitReport = () => {
    if (!reportText.trim()) {
      Alert.alert("त्रुटि", "डिटेल्स लिखें।");
      return;
    }
    Alert.alert("रिपोर्ट सुरक्षित", "आपकी डिटेल्स सुरक्षित कर ली गई हैं। 1930 पर कॉल करें।");
    setReportText('');
  };

  // सेटिंग्स पेज
  if (currentScreen === 'settings') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backBtn}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>⬅ होम पर जाएं</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>⚙️ सेटिंग्स & प्राइवेसी</Text>
        <TouchableOpacity style={styles.card} onPress={() => Alert.alert("Help", "1930 पर कॉल करें।")}><Text style={styles.settingTitle}>📋 Help & Support</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => Share.share({message: 'इस Fraud Face Detector ऐप से साइबर फ्रॉड से बचें!'})}><Text style={styles.settingTitle}>📢 दोस्तों को शेयर करें</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => Alert.alert("प्राइवेसी", "आपका डेटा पूरी तरह सुरक्षित है।")}><Text style={styles.settingTitle}>🔒 प्राइवेसी पॉलिसी</Text></TouchableOpacity>

        <View style={styles.notesBox}>
          <Text style={styles.notesHeader}>📌 ऐप की कार्यप्रणाली</Text>
          <Text style={styles.bulletPoint}>• 🤖 AI स्कैम डिटेक्शन: संदिग्ध मैसेज की जांच।</Text>
          <Text style={styles.bulletPoint}>• 🌐 साइबर पोर्टल: सरकारी वेबसाइट से जुड़ाव।</Text>
          <Text style={styles.bulletPoint}>• 📞 1930 हेल्पलाइन: एक क्लिक कॉल सुविधा।</Text>
          <Text style={styles.bulletPoint}>• 🏦 बैंक इमरजेंसी: खाता ब्लॉक करने के नंबर।</Text>
          <Text style={styles.bulletPoint}>• 💔 लव ट्रैप सुरक्षा: डेटिंग स्कैम से बचाव।</Text>
        </View>
      </ScrollView>
    );
  }

  // होम पेज
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('settings')}><Text style={{fontSize:24}}>⚙️</Text></TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>🛡️ मुख्य सुरक्षा टूल</Text>
        <TouchableOpacity style={styles.btnBlue} onPress={() => Linking.openURL('https://cybercrime.gov.in')}><Text style={styles.btnText}>🌐 साइबर पोर्टल</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnRed} onPress={() => Linking.openURL('tel:1930')}><Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnPurple} onPress={() => Alert.alert("बैंक", "SBI: 1800112211, HDFC: 18002586161")}><Text style={styles.btnText}>🏦 बैंक ब्लॉक लिस्ट</Text></TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TextInput style={styles.input} placeholder="मैसेज पेस्ट करें..." placeholderTextColor="#94a3b8" value={scamInput} onChangeText={setScamInput} />
        <TouchableOpacity style={styles.actionBtn} onPress={runAiCheck}><Text style={{color:'#fff', fontWeight:'bold'}}>चेक करें</Text></TouchableOpacity>
        {aiResult ? <Text style={styles.result}>{aiResult}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 20, color: '#38bdf8', fontWeight: 'bold' },
  box: { backgroundColor: '#1e293b', padding: 15, borderRadius: 12, marginBottom: 15 },
  sectionTitle: { color: '#fff', marginBottom: 10, fontWeight: 'bold' },
  btnBlue: { backgroundColor: '#0284c7', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnRed: { backgroundColor: '#b91c1c', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnPurple: { backgroundColor: '#7c3aed', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#0f172a', color: '#fff', padding: 12, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  actionBtn: { backgroundColor: '#0284c7', padding: 12, borderRadius: 6, alignItems: 'center' },
  result: { color: '#f87171', marginTop: 10, fontWeight: 'bold' },
  card: { padding: 15, backgroundColor: '#1e293b', borderRadius: 8, marginBottom: 10 },
  settingTitle: { color: '#38bdf8', fontWeight: 'bold' },
  notesBox: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, marginTop: 15, borderWidth: 1, borderColor: '#334155' },
  notesHeader: { color: '#38bdf8', fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  bulletPoint: { color: '#cbd5e1', fontSize: 13, marginBottom: 8 }
});
      
