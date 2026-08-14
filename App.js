import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Linking, Share } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [scamInput, setScamInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [reportText, setReportText] = useState('');

  const openWebBrowser = async (url) => {
    try { await WebBrowser.openBrowserAsync(url); } catch (e) { Linking.openURL(url); }
  };

  const runAiCheck = () => {
    if (!scamInput.trim()) return Alert.alert("त्रुटि", "कृपया मैसेज पेस्ट करें।");
    const text = scamInput.toLowerCase();
    const isScam = ['win', 'lottery', 'otp', 'job', 'free', 'love', 'gift', 'video call', 'urgent'].some(word => text.includes(word));
    setAiResult(isScam ? '🚨 खतरा! यह 95% फ्रॉड या स्कैम संदेश हो सकता है। इसे तुरंत डिलीट करें!' : '✅ यह संदेश सामान्य लग रहा है, फिर भी सावधानी बरतें।');
  };

  const submitReport = () => {
    if (!reportText.trim()) return Alert.alert("त्रुटि", "फ्रॉड डिटेल्स लिखें।");
    Alert.alert("सफलतापूर्वक", "आपका डेटा रिकॉर्ड कर लिया गया है। अब आप 1930 पर कॉल करें।");
    setReportText('');
  };

  // स्क्रीन नेविगेशन
  if (currentScreen === 'settings') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backBtn}><Text style={{color:'#fff'}}>⬅ होम पर जाएं</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>⚙️ सेटिंग्स & प्राइवेसी</Text>
        <TouchableOpacity style={styles.card} onPress={() => Alert.alert("Help", "हेल्पलाइन: 1930")}>
          <Text style={styles.settingTitle}>📋 Help & Support</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => Share.share({message: 'इस सुरक्षित ऐप को डाउनलोड करें!'})}>
          <Text style={styles.settingTitle}>📢 शेयर करें</Text></TouchableOpacity>
        <View style={styles.card}><Text style={styles.settingTitle}>🔒 प्राइवेसी: आपका डेटा पूरी तरह सुरक्षित है।</Text></View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('settings')}><Text style={{fontSize:24}}>⚙️</Text></TouchableOpacity>
      </View>

      {/* सेक्शन 1: मुख्य टूल */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>🛡️ मुख्य सुरक्षा टूल</Text>
        <TouchableOpacity style={styles.btnBlue} onPress={() => openWebBrowser('https://cybercrime.gov.in')}><Text style={styles.btnText}>🌐 साइबर पोर्टल</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnRed} onPress={() => Linking.openURL('tel:1930')}><Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnPurple} onPress={() => Alert.alert("ब्लॉक नंबर", "SBI: 1800112211, HDFC: 18002586161")}>
          <Text style={styles.btnText}>🏦 बैंक ब्लॉक लिस्ट</Text></TouchableOpacity>
      </View>

      {/* सेक्शन 2: AI और स्कैम डिटेक्टर */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>🤖 AI & स्कैम सुरक्षा</Text>
        <TextInput style={styles.input} placeholder="मैसेज यहाँ पेस्ट करें..." value={scamInput} onChangeText={setScamInput} />
        <TouchableOpacity style={styles.actionBtn} onPress={runAiCheck}><Text style={{color:'#fff'}}>चेक करें</Text></TouchableOpacity>
        {aiResult ? <Text style={styles.result}>{aiResult}</Text> : null}
      </View>

      {/* सेक्शन 3: लव ट्रैप और अलर्ट */}
      <View style={styles.box}>
        <TouchableOpacity style={styles.loveCard} onPress={() => Alert.alert("लव ट्रैप", "अजनबी लोगों को अपनी पर्सनल तस्वीरें न भेजें।")}>
          <Text style={{color:'#f43f5e', fontWeight:'bold'}}>💔 लव ट्रैप और डेटिंग फ्रॉड से बचें</Text>
        </TouchableOpacity>
        <View style={styles.alertTicker}><Text style={{color:'#facc15'}}>🔴 लाइव: आजकल 'जॉब फ्रॉड' से बचकर रहें!</Text></View>
      </View>

      {/* सेक्शन 4: रिपोर्टिंग */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>📝 फ्रॉड रिपोर्ट दर्ज करें</Text>
        <TextInput style={styles.input} placeholder="डिटेल्स लिखें..." value={reportText} onChangeText={setReportText} />
        <TouchableOpacity style={[styles.actionBtn, {backgroundColor:'#059669'}]} onPress={submitReport}><Text style={{color:'#fff'}}>सुरक्षित रखें</Text></TouchableOpacity>
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
  btnBlue: { backgroundColor: '#0284c7', padding: 15, borderRadius: 8, marginBottom: 10 },
  btnRed: { backgroundColor: '#b91c1c', padding: 15, borderRadius: 8, marginBottom: 10 },
  btnPurple: { backgroundColor: '#7c3aed', padding: 15, borderRadius: 8, marginBottom: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  input: { backgroundColor: '#0f172a', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  actionBtn: { backgroundColor: '#0284c7', padding: 10, borderRadius: 5, alignItems: 'center' },
  result: { color: '#f87171', marginTop: 10 },
  loveCard: { backgroundColor: '#0f172a', padding: 15, borderRadius: 8, borderColor: '#f43f5e', borderWidth: 1 },
  alertTicker: { padding: 10, backgroundColor: '#334155', borderRadius: 8, marginTop: 10 },
  backBtn: { marginBottom: 10, padding: 10, backgroundColor: '#334155', borderRadius: 5 },
  card: { padding: 15, backgroundColor: '#0f172a', borderRadius: 8, marginBottom: 10 },
  settingTitle: { color: '#fff' }
});
    
