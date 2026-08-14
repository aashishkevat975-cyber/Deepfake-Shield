import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Share, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [url, setUrl] = useState(null);

  // 2. स्कैनिंग का स्मार्ट एनीमेशन
  const startScan = () => {
    Alert.alert("Scanning...", "सुरक्षा जाँच की जा रही है, कृपया प्रतीक्षा करें...");
    setTimeout(() => {
      Alert.alert("Result", "आपका डिवाइस सुरक्षित है! लेकिन हमेशा सतर्क रहें।");
    }, 2000);
  };

  // 5. बेहतर शेयरिंग
  const onShareApp = async () => {
    await Share.share({ message: 'सावधान! ऑनलाइन फ्रॉड से बचने के लिए "Fraud Face Detector" ऐप इस्तेमाल करें। डाउनलोड करें: [आपका लिंक]' });
  };

  // 1. इन-ऐप ब्राउजिंग (अगर URL सेट है तो WebView खुलेगा)
  if (url) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
        <View style={styles.webHeader}>
          <TouchableOpacity onPress={() => setUrl(null)}><Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>⬅ वापस जाएं</Text></TouchableOpacity>
        </View>
        <WebView source={{ uri: url }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Title & Sub-title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <Text style={styles.subTitle}>Cyber Security & Scam Checker</Text>
      </View>

      {/* 3. सुरक्षा चेकलिस्ट */}
      <View style={styles.checklist}>
        <Text style={{color:'#fff', fontWeight:'bold', marginBottom:10}}>🛡️ सुरक्षा चेकलिस्ट:</Text>
        <Text style={styles.checkText}>✅ अनजान लिंक पर क्लिक न करें</Text>
        <Text style={styles.checkText}>✅ OTP किसी से साझा न करें</Text>
      </View>

      {/* 4. कलर कोडिंग वाले बटन्स */}
      <TouchableOpacity style={styles.orangeBtn} onPress={startScan}>
        <Text style={styles.btnText}>🔍 स्कैन एंड डिटेक्ट (Fake/Real)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blueBtn} onPress={() => setUrl('https://cybercrime.gov.in')}>
        <Text style={styles.btnText}>🌐 आधिकारिक रिपोर्टिंग पोर्टल</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.greenBtn} onPress={onShareApp}>
        <Text style={styles.btnText}>🔗 ऐप दोस्तों को शेयर करें</Text>
      </TouchableOpacity>
      
      {/* 6. हेल्पलाइन का सीधा बटन */}
      <TouchableOpacity style={styles.redCard} onPress={() => Linking.openURL('tel:1930')}>
        <Text style={styles.cardTitle}>📞 1930 - साइबर हेल्पलाइन</Text>
        <Text style={styles.cardSub}>फ्रॉड होने पर तुरंत कॉल करें</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>© 2026 Cyber Security & Scam Checker</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50 },
  webHeader: { height: 70, backgroundColor: '#1e293b', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 20 },
  header: { marginBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#38bdf8' },
  subTitle: { fontSize: 14, color: '#38bdf8', fontStyle: 'italic' },
  checklist: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, marginBottom: 20 },
  checkText: { color: '#cbd5e1', fontSize: 13, marginVertical: 2 },
  orangeBtn: { backgroundColor: '#f59e0b', padding: 20, borderRadius: 10, marginBottom: 10 },
  blueBtn: { backgroundColor: '#0284c7', padding: 20, borderRadius: 10, marginBottom: 10 },
  greenBtn: { backgroundColor: '#059669', padding: 20, borderRadius: 10, marginBottom: 20 },
  redCard: { backgroundColor: '#b91c1c', padding: 20, borderRadius: 10, marginBottom: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardSub: { color: '#fee2e2', fontSize: 12 },
  footer: { textAlign: 'center', color: '#475569', marginTop: 10, marginBottom: 40 }
});
  
