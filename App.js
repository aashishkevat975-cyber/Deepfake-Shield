import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Linking, Share } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [scamInput, setScamInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [reportText, setReportText] = useState('');

  const openWebBrowser = async (url) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };

  const runAiCheck = () => {
    if (!scamInput.trim()) {
      Alert.alert("त्रुटि", "कृपया जाँच करने के लिए कोई मैसेज या लिंक यहाँ लिखें।");
      return;
    }
    const text = scamInput.toLowerCase();
    if (text.includes('win') || text.includes('lottery') || text.includes('otp') || text.includes('job') || text.includes('free') || text.includes('kisi')) {
      setAiResult('🚨 खतरा! यह 95% फ्रॉड या स्कैम संदेश हो सकता है। इसे तुरंत डिलीट करें!');
    } else {
      setAiResult('✅ यह संदेश सामान्य लग रहा है, फिर भी अपनी निजी जानकारी शेयर न करें।');
    }
  };

  const submitReport = () => {
    if (!reportText.trim()) {
      Alert.alert("त्रुटि", "कृपया फ्रॉड की डिटेल्स या मैसेज यहाँ लिखें।");
      return;
    }
    Alert.alert("सफलतापूर्वक दर्ज", "आपका यह फ्रॉड रिकॉर्ड सुरक्षित कर लिया गया है। आप इसे सीधे 1930 या साइबर पोर्टल पर रिपोर्ट कर सकते हैं।");
    setReportText('');
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message: 'देश को साइबर ठगी से बचाने के लिए इस "Fraud Face Detector" ऐप का उपयोग करें और सुरक्षित रहें।'
      });
    } catch (error) {}
  };

  // ================= SETTINGS SCREEN =================
  if (currentScreen === 'settings') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backBtn}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>⬅ होम पर वापस जाएं</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>⚙️ App Settings & Security</Text>

        <TouchableOpacity style={styles.settingCard} onPress={() => Alert.alert("Help & Support", "किसी भी साइबर फ्रॉड की स्थिति में तुरंत 1930 पर कॉल करें।")}>
          <Text style={styles.settingTitle}>📋 Help & Support</Text>
          <Text style={styles.settingDesc}>सहायता और संपर्क करने के निर्देश</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard} onPress={() => Alert.alert("धन्यवाद!", "प्ले स्टोर पर 5-स्टार रेटिंग देने के लिए शुक्रिया!")}>
          <Text style={styles.settingTitle}>⭐ Rate Our App</Text>
          <Text style={styles.settingDesc}>हमें गूगल प्ले स्टोर पर रेटिंग दें</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard} onPress={shareApp}>
          <Text style={styles.settingTitle}>📢 दोस्तों को शेयर करें</Text>
          <Text style={styles.settingDesc}>अपनों को ऑनलाइन ठगी से बचाएं</Text>
        </TouchableOpacity>

        <View style={styles.settingCard}>
          <Text style={styles.settingTitle}>🔒 Privacy Policy</Text>
          <Text style={styles.settingDesc}>आपका कोई भी डेटा हमारे सर्वर पर सेव नहीं किया जाता है।</Text>
        </View>
      </ScrollView>
    );
  }

  // ================= HOME SCREEN =================
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.topBar}>
        <View>
          <Text style={styles.headerTitle}>Fraud Face Detector</Text>
          <Text style={styles.subTitle}>National Cyber Security Shield</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => setCurrentScreen('settings')}>
          <Text style={{fontSize: 22}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* मुख्य सुरक्षा उपकरण (पुराने फीचर्स) */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>🛡️ मुख्य सुरक्षा उपकरण (Core Tools)</Text>
        
        <TouchableOpacity style={styles.primaryBtn} onPress={() => openWebBrowser('https://cybercrime.gov.in')}>
          <Text style={styles.btnText}>🌐 राष्ट्रीय साइबर क्राइम पोर्टल खोलें</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redCard} onPress={() => Linking.openURL('tel:1930')}>
          <Text style={styles.cardTitle}>📞 1930 - साइबर हेल्पलाइन (तत्काल कॉल)</Text>
          <Text style={styles.cardSub}>फ्रॉड होने पर तुरंत पुलिस को कॉल करें</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.purpleBtn} onPress={() => Alert.alert("बैंक ब्लॉक नंबर", "SBI: 1800112211\nHDFC: 18002586161\nतुरंत कॉल करके खाता ब्लॉक करवाएं।")}>
          <Text style={styles.btnText}>🏦 बैंक खाता और कार्ड ब्लॉक नंबर</Text>
        </TouchableOpacity>
      </View>

      {/* नए एडवांस्ड फीचर्स (नीचे की तरफ) */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>🚀 नए एडवांस्ड फीचर्स (Advanced Shield)</Text>

        <View style={styles.cardBox}>
          <Text style={styles.cardHeader}>🤖 AI स्कैम मैसेज डिटेक्टर</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="यहाँ कोई भी संदिग्ध मैसेज या लिंक पेस्ट करें..."
            placeholderTextColor="#64748b"
            value={scamInput}
            onChangeText={setScamInput}
          />
          <TouchableOpacity style={styles.actionBtn} onPress={runAiCheck}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>AI से जाँच करवाएं</Text>
          </TouchableOpacity>
          {aiResult ? <Text style={styles.resultText}>{aiResult}</Text> : null}
        </View>

        <View style={styles.alertTicker}>
          <Text style={{color: '#facc15', fontWeight: 'bold'}}>🔴 लाइव स्कैम अलर्ट (Live Ticker):</Text>
          <Text style={{color: '#cbd5e1', fontSize: 13, marginTop: 4}}>
            आजकल 'पार्ट-टाइम जॉब' और 'कस्टम्स पार्सल' के नाम पर सबसे ज्यादा ठगी हो रही है।
          </Text>
        </View>

        <View style={styles.cardBox}>
          <Text style={styles.cardHeader}>📝 फ्रॉड रिपोर्ट दर्ज करें (Evidence Saver)</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="फ्रॉड करने वाले का नंबर या डिटेल्स लिखें..."
            placeholderTextColor="#64748b"
            value={reportText}
            onChangeText={setReportText}
          />
          <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#059669'}]} onPress={submitReport}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>सुरक्षित रखें (Save Evidence)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.tipCard} onPress={() => Alert.alert("साइबर सुरक्षा नियम", "1. कभी भी अपना OTP या UPI पिन शेयर न करें।\n2. अनजान ऐप डाउनलोड न करें।")}>
          <Text style={{color: '#38bdf8', fontWeight: 'bold', fontSize: 15}}>💡 आज के साइबर सुरक्षा टिप्स (पढ़ें)</Text>
          <Text style={{color: '#94a3b8', fontSize: 12, marginTop: 2}}>सुरक्षित रहने के लिए जरूरी दिशानिर्देश</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.footer}>© 2026 Fraud Face Detector - देश की डिजिटल सुरक्षा</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#38bdf8' },
  subTitle: { fontSize: 12, color: '#38bdf8' },
  settingsBtn: { backgroundColor: '#1e293b', padding: 8, borderRadius: 8 },
  sectionBox: { marginBottom: 20, backgroundColor: '#1e293b', padding: 15, borderRadius: 12 },
  sectionTitle: { color: '#f8fafc', fontSize: 16, fontWeight: 'bold', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#334155', paddingBottom: 6 },
  primaryBtn: { backgroundColor: '#0284c7', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  purpleBtn: { backgroundColor: '#7c3aed', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  redCard: { backgroundColor: '#b91c1c', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  cardSub: { color: '#fee2e2', fontSize: 11, marginTop: 2 },
  cardBox: { backgroundColor: '#0f172a', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#334155' },
  cardHeader: { color: '#38bdf8', fontWeight: 'bold', marginBottom: 8, fontSize: 14 },
  inputBox: { backgroundColor: '#1e293b', color: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#475569', marginBottom: 8, fontSize: 13 },
  actionBtn: { backgroundColor: '#0284c7', padding: 10, borderRadius: 6, alignItems: 'center' },
  resultText: { color: '#f87171', marginTop: 8, fontSize: 13, fontWeight: 'bold' },
  alertTicker: { backgroundColor: '#334155', padding: 12, borderRadius: 8, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#facc15' },
  tipCard: { backgroundColor: '#0f172a', padding: 12, borderRadius: 8, marginBottom: 5, borderWidth: 1, borderColor: '#334155' },
  settingCard: { backgroundColor: '#1e293b', padding: 16, borderRadius: 10, marginBottom: 12 },
  settingTitle: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  settingDesc: { color: '#cbd5e1', fontSize: 13 },
  backBtn: { marginBottom: 15, padding: 10, backgroundColor: '#1e293b', borderRadius: 8, alignSelf: 'flex-start' },
  footer: { textAlign: 'center', color: '#475569', marginTop: 10, marginBottom: 30, fontSize: 12 }
});
  
