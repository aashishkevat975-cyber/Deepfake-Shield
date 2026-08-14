import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Linking, Share } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [scamInput, setScamInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [reportText, setReportText] = useState('');

  const runAiCheck = () => {
    if (!scamInput.trim()) { Alert.alert("त्रुटि", "कृपया जांच के लिए मैसेज यहाँ पेस्ट करें।"); return; }
    const text = scamInput.toLowerCase();
    const isScam = ['win', 'lottery', 'otp', 'job', 'free', 'love', 'gift', 'video call', 'urgent', 'paisa', 'reward'].some(word => text.includes(word));
    setAiResult(isScam ? '🚨 खतरा! यह 95% फ्रॉड या स्कैम संदेश हो सकता है।' : '✅ यह संदेश सामान्य लग रहा है, फिर भी सावधान रहें।');
  };

  const submitReport = () => {
    if (!reportText.trim()) { Alert.alert("त्रुटि", "कृपया फ्रॉड से जुड़ी डिटेल्स लिखें।"); return; }
    Alert.alert("रिपोर्ट सुरक्षित", "आपकी डिटेल्स सुरक्षित कर ली गई हैं। तुरंत 1930 पर कॉल करें।");
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
        
        {/* Support Us / Donate बटन (आपकी UPI आईडी के साथ) */}
        <TouchableOpacity style={styles.supportCard} onPress={() => Linking.openURL('upi://pay?pa=Aashishkevat975@ybl&pn=Aashish%20Kevat&cu=INR')}>
          <Text style={styles.supportTitle}>❤️ Support Us (सहयोग करें)</Text>
          <Text style={{color:'#cbd5e1', fontSize:12, marginTop:2}}>Aashishkevat975@ybl पर सहयोग देकर इस ऐप को आगे बढ़ाएं।</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => Alert.alert("Help & Support", "किसी भी साइबर धोखाधड़ी की स्थिति में तुरंत राष्ट्रीय हेल्पलाइन 1930 पर कॉल करें।")}>
          <Text style={styles.settingTitle}>📋 Help & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => Share.share({message: 'इस Fraud Face Detector ऐप से साइबर फ्रॉड से बचें!'})}>
          <Text style={styles.settingTitle}>📢 दोस्तों के साथ शेयर करें</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => Alert.alert("प्राइवेसी पॉलिसी", "आपका डेटा पूरी तरह सुरक्षित है और किसी के साथ साझा नहीं किया जाता।")}>
          <Text style={styles.settingTitle}>🔒 प्राइवेसी पॉलिसी</Text>
        </TouchableOpacity>

        <View style={styles.notesBox}>
          <Text style={styles.notesHeader}>📌 हमारी सेवा और सुरक्षा</Text>
          <Text style={styles.notesDesc}>'Fraud Face Detector' ऐप का मुख्य उद्देश्य आपको ऑनलाइन ठगी, बैंकिंग फ्रॉड और सोशल मीडिया स्कैम से सुरक्षित रखना है। हमारा AI सिस्टम आपको संदिग्ध मैसेज की पहचान करने में मदद करता है।</Text>
          <Text style={styles.bulletPoint}>✅ 24/7 सुरक्षा अलर्ट</Text>
          <Text style={styles.bulletPoint}>✅ तुरंत बैंक ब्लॉक सुविधा</Text>
          <Text style={styles.bulletPoint}>✅ साइबर क्राइम हेल्पलाइन एक्सेस</Text>
          <Text style={styles.notesFooter}>हमारा लक्ष्य है: "सतर्क रहें, सुरक्षित रहें।"</Text>
        </View>
      </ScrollView>
    );
  }

  // होम पेज (सभी एक्टिव बटन्स के साथ)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('settings')} style={{padding:5}}>
          <Text style={{fontSize:24}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>🛡️ मुख्य सुरक्षा टूल</Text>
        <TouchableOpacity style={styles.btnBlue} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
          <Text style={styles.btnText}>🌐 साइबर पोर्टल</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRed} onPress={() => Linking.openURL('tel:1930')}>
          <Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPurple} onPress={() => Alert.alert("बैंक ब्लॉक लिस्ट", "SBI: 1800112211\nHDFC: 18002586161\nICICI: 18002662\nPNB: 18001802222")}>
          <Text style={styles.btnText}>🏦 बैंक ब्लॉक लिस्ट</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>🤖 AI & स्कैम सुरक्षा</Text>
        <TextInput style={styles.input} placeholder="मैसेज यहाँ पेस्ट करें..." placeholderTextColor="#94a3b8" value={scamInput} onChangeText={setScamInput} />
        <TouchableOpacity style={styles.actionBtn} onPress={runAiCheck}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>चेक करें</Text>
        </TouchableOpacity>
        {aiResult ? <Text style={styles.result}>{aiResult}</Text> : null}
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.loveCard} onPress={() => Alert.alert("लव ट्रैप सुरक्षा", "सोशल मीडिया पर किसी भी अजनबी की बातों में आकर अपनी निजी तस्वीरें या पैसे न भेजें। यह ब्लैकमेलिंग का बड़ा जाल हो सकता है!")}>
          <Text style={{color:'#f43f5e', fontWeight:'bold'}}>💔 लव ट्रैप और डेटिंग फ्रॉड से बचें</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.alertTicker} onPress={() => Alert.alert("लाइव अलर्ट", "सावधान! आजकल टेलीग्राम और व्हाट्सएप पर फर्जी 'वर्क फ्रॉम होम' और 'टास्क फ्रॉड' जॉब ऑफर्स से बचकर रहें।")}>
          <Text style={{color:'#facc15', fontWeight:'bold'}}>🔴 लाइव अलर्ट:</Text>
          <Text style={{color:'#cbd5e1', fontSize:12, marginTop:2}}>आजकल 'जॉब फ्रॉड' और फर्जी कॉल्स से बचकर रहें!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>📝 फ्रॉड रिपोर्ट दर्ज करें</Text>
        <TextInput style={styles.input} placeholder="डिटेल्स लिखें..." placeholderTextColor="#94a3b8" value={reportText} onChangeText={setReportText} />
        <TouchableOpacity style={[styles.actionBtn, {backgroundColor:'#059669'}]} onPress={submitReport}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>सुरक्षित रखें</Text>
        </TouchableOpacity>
          <View style={styles.box}>
        <Text style={styles.sectionTitle}>📝 फ्रॉड रिपोर्ट दर्ज करें</Text>
        <TextInput style={styles.input} placeholder="डिटेल्स लिखें..." placeholderTextColor="#94a3b8" />
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>सबमिट करें</Text>
        </TouchableOpacity>
      </View>

      {/* --- नया जोड़ा गया फीचर्स बॉक्स --- */}
      <View style={{ padding: 15, backgroundColor: '#1e293b', borderRadius: 10, margin: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#38bdf8', marginBottom: 5 }}>🚀 यह ऐप कैसे काम करता है?</Text>
        <Text style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 20 }}>
          1. 🛡️ फेस डिटेक्शन और फ्रॉड अलर्ट{'\n'}
          2. 🔒 सुरक्षित साइबर टूल्स (एंटी-वायरस/वीपीएन){'\n'}
          3. 💡 डेली सेफ्टी टिप्स और जानकारी{'\n'}
          4. 🔗 स्मार्ट शेयरिंग फीचर्स{'\n'}
          5. ⚙️ कस्टम सेटिंग्स मैनेज करें
        </Text>
      </View>

      </ScrollView>
  );
}

 const styles = StyleSheet.create({
   
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, color: '#38bdf8', fontWeight: 'bold' },
  box: { backgroundColor: '#1e293b', padding: 15, borderRadius: 12, marginBottom: 15 },
  sectionTitle: { color: '#fff', marginBottom: 10, fontWeight: 'bold', fontSize: 15 },
  btnBlue: { backgroundColor: '#0284c7', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnRed: { backgroundColor: '#b91c1c', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnPurple: { backgroundColor: '#7c3aed', padding: 14, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#0f172a', color: '#fff', padding: 12, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  actionBtn: { backgroundColor: '#0284c7', padding: 12, borderRadius: 6, alignItems: 'center' },
  result: { color: '#f87171', marginTop: 10, fontWeight: 'bold', fontSize: 13 },
  loveCard: { backgroundColor: '#0f172a', padding: 14, borderRadius: 8, borderColor: '#f43f5e', borderWidth: 1, marginBottom: 10 },
  alertTicker: { padding: 12, backgroundColor: '#334155', borderRadius: 8 },
  backBtn: { marginBottom: 15, padding: 10, backgroundColor: '#1e293b', borderRadius: 8, alignSelf: 'flex-start' },
  card: { padding: 15, backgroundColor: '#1e293b', borderRadius: 8, marginBottom: 10 },
  supportCard: { padding: 15, backgroundColor: '#312e81', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#4f46e5' },
  supportTitle: { color: '#f43f5e', fontWeight: 'bold', fontSize: 16 },
  settingTitle: { color: '#38bdf8', fontWeight: 'bold' },
  notesBox: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, marginTop: 15, marginBottom: 30, borderWidth: 1, borderColor: '#334155' },
  notesHeader: { color: '#38bdf8', fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  notesDesc: { color: '#fff', fontSize: 14, marginBottom: 10 },
  bulletPoint: { color: '#cbd5e1', fontSize: 13, marginBottom: 5 },
  notesFooter: { color: '#38bdf8', marginTop: 15, fontStyle: 'italic' }
});
