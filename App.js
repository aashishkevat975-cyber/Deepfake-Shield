import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Share } from 'react-native';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  // ऐप शेयर करने का फंक्शन
  const onShareApp = async () => {
    try {
      await Share.share({
        message: 'सावधान! ऑनलाइन फ्रॉड और डीपफेक से बचने के लिए इस बेहतरीन "Fraud Face Detector" ऐप का इस्तेमाल करें और सुरक्षित रहें। अभी डाउनलोड करें!',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* सेटिंग्स पेज */}
      {showSettings ? (
        <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setShowSettings(false)}>
            <Text style={styles.backBtnText}>⬅ वापस जाएं</Text>
          </TouchableOpacity>
          
          <Text style={styles.settingsHeading}>Settings & Info</Text>

          <TouchableOpacity style={styles.settingItem} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
            <Text style={styles.settingTitle}>🌐 आधिकारिक साइबर क्राइम पोर्टल</Text>
            <Text style={styles.settingSub}>cybercrime.gov.in पर जाएं</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => alert('Fraud Face Detector ऐप ऑनलाइन स्कैम, फेक फोटो और फ्रॉड से सतर्क रहने के लिए बनाया गया है।')}>
            <Text style={styles.settingTitle}>ℹ️ हमारे बारे में (About Us)</Text>
            <Text style={styles.settingSub}>ऐप की जानकारी और उद्देश्य</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={onShareApp}>
            <Text style={styles.settingTitle}>📤 ऐप शेयर करें</Text>
            <Text style={styles.settingSub}>दोस्तों और परिवार के साथ साझा करें</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => alert('किसी भी सहायता के लिए भारत सरकार के साइबर हेल्पलाइन नंबर 1930 पर कॉल करें।')}>
            <Text style={styles.settingTitle}>📞 सहायता और फीडबैक (Support)</Text>
            <Text style={styles.settingSub}>मदद और संपर्क जानकारी</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        /* मुख्य होम स्क्रीन */
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Fraud Face Detector</Text>
              <Text style={styles.headerSub}>ऑनलाइन फ्रॉड और स्कैम से बचाव</Text>
            </View>
            {/* सेटिंग्स आइकॉन बटन */}
            <TouchableOpacity style={styles.settingsIconBtn} onPress={() => setShowSettings(true)}>
              <Text style={styles.settingsIconText}>⚙️</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.motivationBox}>
            <Text style={styles.motivationText}>🚨 सतर्क रहें, सुरक्षित रहें! किसी भी संदिग्‍ध गतिविधि की तुरंत जाँच करें।</Text>
          </View>

          {/* ऐप शेयर करने वाला बटन */}
          <TouchableOpacity style={styles.shareAppBtn} onPress={onShareApp}>
            <Text style={styles.shareAppText}>🔗 ऐप शेयर करें (अपने दोस्तों को बचाएं)</Text>
          </TouchableOpacity>

          {/* मुख्य फोटो स्कैनिंग बटन */}
          <TouchableOpacity style={styles.pickPhotoBtn} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
            <Text style={styles.pickPhotoText}>📷 PICK PHOTO (फोटो स्कैन करें)</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>आधिकारिक साइबर सुरक्षा श्रेणियां</Text>
          
          <TouchableOpacity style={[styles.btnBox, styles.alertBtn]} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
            <Text style={styles.btnBoldWhite}>🚨 Financial Fraud (पैसे की ठगी)</Text>
            <Text style={styles.btnSpanWhite}>ऑनलाइन वित्तीय धोखाधड़ी की शिकायत दर्ज करें</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnBox} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
            <Text style={styles.btnBold}>🛡️ Women / Children Related Crime</Text>
            <Text style={styles.btnSpan}>संवेदनशील मामलों की गुप्त रूप से रिपोर्ट करें</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnBox} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
            <Text style={styles.btnBold}>🔍 Report Cyber Crime Portal</Text>
            <Text style={styles.btnSpan}>भारत सरकार के आधिकारिक पोर्टल (cybercrime.gov.in)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnBox} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
            <Text style={styles.btnBold}>📞 Helpline Number (1930)</Text>
            <Text style={styles.btnSpan}>फ्रॉड होने पर तुरंत सहायता के लिए कॉल करें</Text>
          </TouchableOpacity>

          <View style={[styles.motivationBox, {marginTop: 15}]}>
            <Text style={styles.motivationText}>💡 सुरक्षा टिप: किसी भी अनजान व्यक्ति के साथ अपना OTP या बैंक डिटेल शेयर न करें।</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10, paddingTop: 40 },
  header: { backgroundColor: '#1e293b', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8' },
  headerSub: { fontSize: 10, color: '#94a3b8', marginTop: 3 },
  settingsIconBtn: { backgroundColor: '#334155', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  settingsIconText: { fontSize: 18 },
  motivationBox: { backgroundColor: '#1e293b', padding: 10, borderRadius: 6, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#0ea5e9' },
  motivationText: { fontSize: 12, fontWeight: 'bold', color: '#38bdf8', textAlign: 'center' },
  sectionTitle: { backgroundColor: '#1e293b', color: '#cbd5e1', padding: 8, borderRadius: 6, fontSize: 13, fontWeight: 'bold', marginVertical: 10 },
  shareAppBtn: { backgroundColor: '#10b981', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 5 },
  shareAppText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  pickPhotoBtn: { backgroundColor: '#0ea5e9', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 5 },
  pickPhotoText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  btnBox: { backgroundColor: '#1e293b', padding: 12, borderRadius: 6, marginVertical: 6, borderWidth: 1, borderColor: '#334155' },
  alertBtn: { backgroundColor: '#dc2626', borderWidth: 0 },
  btnBold: { fontSize: 14, fontWeight: 'bold', color: '#38bdf8' },
  btnSpan: { fontSize: 10, color: '#94a3b8', marginTop: 2 },
  btnBoldWhite: { fontSize: 14, fontWeight: 'bold', color: 'white' },
  btnSpanWhite: { fontSize: 10, color: '#fee2e2', marginTop: 2 },
  backBtn: { backgroundColor: '#ef4444', padding: 10, borderRadius: 6, marginBottom: 15, alignSelf: 'flex-start' },
  backBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  settingsHeading: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
  settingItem: { backgroundColor: '#1e293b', padding: 15, borderRadius: 6, marginVertical: 6, borderWidth: 1, borderColor: '#334155' },
  settingTitle: { fontSize: 15, fontWeight: 'bold', color: '#38bdf8' },
  settingSub: { fontSize: 11, color: '#94a3b8', marginTop: 3 },
});
  
