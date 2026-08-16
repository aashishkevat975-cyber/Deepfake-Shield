import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Linking 
} from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [messageText, setMessageText] = useState('');
  const [reportText, setReportText] = useState('');
  const [checkResult, setCheckResult] = useState('यह संदेश सामान्य लग रहा है, फिर भी सावधान रहें।');

  // सपोर्ट बटन दबाने पर UPI लिंक खुलेगा
  const handleSupport = () => {
    Linking.openURL('upi://pay?pa=Aashishkevat975@ybl&pn=Aashish%20Kevat&cu=INR');
  };

  // WhatsApp शेयरिंग फंक्शन
  const handleShareApp = () => {
    const shareText = encodeURIComponent('नमस्कार! ऑनलाइन फ्रॉड और स्कैम से सुरक्षित रहने के लिए हमारा यह "Fraud Face Detector" ऐप जरूर डाउनलोड करें।');
    Linking.openURL(`whatsapp://send?text=${shareText}`);
  };

  const handleCheckMessage = () => {
    if (!messageText.trim()) {
      setCheckResult('कृपया जाँच करने के लिए कोई संदेश यहाँ पेस्ट करें।');
      return;
    }
    const lower = messageText.toLowerCase();
    if (lower.includes('lottery') || lower.includes('won') || lower.includes('prize') || lower.includes('jeete') || lower.includes('farji') || lower.includes('otp')) {
      setCheckResult('⚠️ चेतावनी: यह फ्रॉड या स्कैम संदेश लग सकता है!');
    } else {
      setCheckResult('✅ यह संदेश सामान्य लग रहा है।');
    }
  };

  if (currentScreen === 'settings') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backButtonText}>← होम पर वापस</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>⚙️ सेटिंग्स & प्राइवेसी</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.settingCard} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
            <Text style={styles.settingTitle}>1. साइबर क्राइम हेल्पलाइन नंबर</Text>
            <Text style={styles.settingDesc}>1930 नंबर और आधिकारिक वेबसाइट लिंक</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard} onPress={() => Linking.openURL('tel:1930')}>
            <Text style={styles.settingTitle}>2. बैंक फ्रॉड & तुरंत ब्लॉक नंबर</Text>
            <Text style={styles.settingDesc}>SBI, PNB, HDFC और अन्य बैंकों के हेल्पलाइन</Text>
          </TouchableOpacity>

          <View style={styles.settingCard}>
            <Text style={styles.settingTitle}>3. नोटिफिकेशन & अलर्ट</Text>
            <Text style={styles.settingDesc}>नए ऑनलाइन फ्रॉड अलर्ट प्राप्त करें</Text>
          </View>

          <View style={styles.settingCard}>
            <Text style={styles.settingTitle}>4. ऑटो स्कैम डिटेक्टर</Text>
            <Text style={styles.settingDesc}>संदिग्ध संदेशों की स्वचालित जांच</Text>
          </View>

          <View style={styles.settingCard}>
            <Text style={styles.settingTitle}>5. डिस्प्ले & डार्क मोड</Text>
            <Text style={styles.settingDesc}>आंखों की सुरक्षा के लिए थीम बदलें</Text>
          </View>

          {/* शेयर बटन यहाँ एक्टिव कर दिया गया है */}
          <TouchableOpacity style={styles.settingCard} onPress={handleShareApp}>
            <Text style={styles.settingTitle}>6. दोस्तों के साथ शेयर करें</Text>
            <Text style={styles.settingDesc}>लिंक के साथ WhatsApp पर भेजें</Text>
          </TouchableOpacity>

          <View style={styles.settingCard}>
            <Text style={styles.settingTitle}>7. प्राइवेसी पॉलिसी & सुरक्षा</Text>
            <Text style={styles.settingDesc}>आपका डेटा और पहचान पूरी तरह सुरक्षित</Text>
          </View>

          <View style={styles.settingCard}>
            <Text style={styles.settingTitle}>8. हेल्प & सपोर्ट</Text>
            <Text style={styles.settingDesc}>हमसे संपर्क करें</Text>
          </View>

          {/* Support Us बटन */}
          <TouchableOpacity style={styles.supportButton} onPress={handleSupport}>
            <Text style={styles.supportButtonText}>❤️ Support Us (सहयोग करें)</Text>
            <Text style={styles.supportButtonSubText}>Aashishkevat975@ybl पर सहयोग दें</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainHeader}>
        <Text style={styles.appName}>Fraud Face Detector</Text>
        <TouchableOpacity style={styles.settingsIconBtn} onPress={() => setCurrentScreen('settings')}>
          <Text style={styles.settingsIconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionHeaderTitle}>🛡️ मुख्य सुरक्षा टूल</Text>
          <TouchableOpacity style={styles.cyberPortalBtn} onPress={() => Linking.openURL('https://cybercrime.gov.in')}><Text style={styles.btnTextWhite}>🌐 साइबर पोर्टल</Text></TouchableOpacity>
          <TouchableOpacity style={styles.helplineBtn} onPress={() => Linking.openURL('tel:1930')}><Text style={styles.btnTextWhite}>📞 1930 हेल्पलाइन</Text></TouchableOpacity>
          <TouchableOpacity style={styles.blockListBtn}><Text style={styles.btnTextWhite}>🏦 बैंक ब्लॉक लिस्ट</Text></TouchableOpacity>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionHeaderTitle}>🤖 AI & स्कैम सुरक्षा</Text>
          <TextInput style={styles.textInputBox} placeholder="संदेश यहाँ पेस्ट करें..." placeholderTextColor="#888" value={messageText} onChangeText={setMessageText} />
          <TouchableOpacity style={styles.checkBtn} onPress={handleCheckMessage}><Text style={styles.btnTextWhite}>चेक करें</Text></TouchableOpacity>
          <Text style={styles.resultText}>{checkResult}</Text>
        </View>

        <View style={styles.loveTrapBox}><Text style={styles.loveTrapText}>💔 लव ट्रैप और डेटिंग फ्रॉड से बचें</Text></View>

        <View style={styles.liveAlertBox}>
          <Text style={styles.liveAlertTitle}>🔴 लाइव अलर्ट:</Text>
          <Text style={styles.liveAlertDesc}>आजकल 'जॉब फ्रॉड' और फर्जी कॉल्स से बचकर रहें!</Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionHeaderTitle}>📝 फ्रॉड रिपोर्ट दर्ज करें</Text>
          <TextInput style={[styles.textInputBox, { height: 70 }]} placeholder="डिटेल्स लिखें..." multiline={true} value={reportText} onChangeText={setReportText} />
          <TouchableOpacity style={styles.saveReportBtn} onPress={() => alert('रिपोर्ट दर्ज हो गई!')}><Text style={styles.btnTextWhite}>सुरक्षित रखें</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b' },
  mainHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1c2541' },
  appName: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  settingsIconText: { fontSize: 22 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#0b132b' },
  backButton: { marginRight: 15, backgroundColor: '#1c2541', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  backButtonText: { color: '#ffffff' },
  screenTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 16, paddingBottom: 30 },
  sectionBox: { backgroundColor: '#1c2541', borderRadius: 12, padding: 15, marginBottom: 15 },
  sectionHeaderTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  btnTextWhite: { color: '#ffffff', fontWeight: 'bold' },
  cyberPortalBtn: { backgroundColor: '#0096c7', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  helplineBtn: { backgroundColor: '#d90429', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  blockListBtn: { backgroundColor: '#7b2cbf', padding: 12, borderRadius: 8, alignItems: 'center' },
  textInputBox: { backgroundColor: '#0b132b', color: '#ffffff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#3a506b', marginBottom: 10 },
  checkBtn: { backgroundColor: '#0077b6', padding: 12, borderRadius: 8, alignItems: 'center' },
  resultText: { color: '#ffb703', marginTop: 10, fontSize: 13 },
  loveTrapBox: { backgroundColor: '#1c2541', padding: 15, borderRadius: 12, marginBottom: 15, borderColor: '#ef476f', borderWidth: 1, alignItems: 'center' },
  loveTrapText: { color: '#ff6b6b', fontWeight: 'bold', fontSize: 15 },
  liveAlertBox: { backgroundColor: '#212529', padding: 15, borderRadius: 12, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#ff0054' },
  liveAlertTitle: { color: '#ff4d6d', fontWeight: 'bold', fontSize: 15 },
  liveAlertDesc: { color: '#adb5bd', fontSize: 13 },
  saveReportBtn: { backgroundColor: '#2b9348', padding: 12, borderRadius: 8, alignItems: 'center' },
  settingCard: { backgroundColor: '#1c2541', borderRadius: 10, padding: 15, marginBottom: 12 },
  settingTitle: { color: '#48cae4', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  settingDesc: { color: '#adb5bd', fontSize: 13 },
  supportButton: { backgroundColor: '#4361ee', borderRadius: 12, padding: 20, alignItems: 'center', marginTop: 20 },
  supportButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  supportButtonSubText: { color: '#d0d0d0', fontSize: 12, marginTop: 5 }
});
      
