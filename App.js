import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Linking, Share } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [scamInput, setScamInput] = useState('');
  const [aiResult, setAiResult] = useState('');

  const runAiCheck = () => {
    if (!scamInput.trim()) { Alert.alert("त्रुटि", "मैसेज लिखें"); return; }
    const text = scamInput.toLowerCase();
    const isScam = ['win', 'lottery', 'otp', 'job', 'free', 'love', 'gift'].some(word => text.includes(word));
    setAiResult(isScam ? '🚨 खतरा! फ्रॉड हो सकता है।' : '✅ सामान्य लग रहा है।');
  };

  if (currentScreen === 'settings') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backBtn}><Text style={{color:'#fff'}}>⬅ वापस</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>⚙️ सेटिंग्स</Text>
        
        {/* Support Us / Donate बटन */}
        <TouchableOpacity style={styles.supportCard} onPress={() => Linking.openURL('https://your-upi-or-donation-link.com')}>
          <Text style={styles.supportTitle}>❤️ Support Us (सहयोग करें)</Text>
          <Text style={{color:'#cbd5e1', fontSize:12, marginTop:2}}>इस ऐप को बेहतर बनाने और सुरक्षित रखने में हमारी मदद करें।</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => Alert.alert("Help", "1930 पर कॉल करें।")}><Text style={styles.settingTitle}>📋 Help & Support</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => Share.share({message: 'Fraud Face Detector डाउनलोड करें!'})}><Text style={styles.settingTitle}>📢 शेयर करें</Text></TouchableOpacity>
        
        <View style={styles.notesBox}>
          <Text style={styles.notesHeader}>📌 हमारी सेवा और सुरक्षा</Text>
          <Text style={styles.notesDesc}>'Fraud Face Detector' आपको ऑनलाइन ठगी से सुरक्षित रखता है। हमारा AI संदिग्ध मैसेज की पहचान करता है।</Text>
          <Text style={styles.bulletPoint}>✅ 24/7 सुरक्षा अलर्ट</Text>
          <Text style={styles.bulletPoint}>✅ बैंक ब्लॉक सुविधा</Text>
          <Text style={styles.bulletPoint}>✅ साइबर हेल्पलाइन एक्सेस</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('settings')}><Text style={{fontSize:24}}>⚙️</Text></TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.btnBlue} onPress={() => Linking.openURL('https://cybercrime.gov.in')}><Text style={styles.btnText}>🌐 साइबर पोर्टल</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnRed} onPress={() => Linking.openURL('tel:1930')}><Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text></TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TextInput style={styles.input} placeholder="मैसेज यहाँ पेस्ट करें..." value={scamInput} onChangeText={setScamInput} />
        <TouchableOpacity style={styles.actionBtn} onPress={runAiCheck}><Text style={{color:'#fff'}}>चेक करें</Text></TouchableOpacity>
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
  btnBlue: { backgroundColor: '#0284c7', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnRed: { backgroundColor: '#b91c1c', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#0f172a', color: '#fff', padding: 12, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  actionBtn: { backgroundColor: '#0284c7', padding: 12, borderRadius: 6, alignItems: 'center' },
  result: { color: '#f87171', marginTop: 10, fontWeight: 'bold' },
  card: { padding: 15, backgroundColor: '#1e293b', borderRadius: 8, marginBottom: 10 },
  supportCard: { padding: 15, backgroundColor: '#312e81', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#4f46e5' },
  supportTitle: { color: '#f43f5e', fontWeight: 'bold', fontSize: 16 },
  settingTitle: { color: '#38bdf8', fontWeight: 'bold' },
  notesBox: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, marginTop: 15, borderWidth: 1, borderColor: '#334155' },
  notesHeader: { color: '#38bdf8', fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  notesDesc: { color: '#fff', fontSize: 14, marginBottom: 10 },
  bulletPoint: { color: '#cbd5e1', fontSize: 13, marginBottom: 5 },
  backBtn: { marginBottom: 15 }
});
    
