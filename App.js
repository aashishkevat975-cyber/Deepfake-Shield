import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Share, Linking, Image, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [url, setUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [scamLink, setScamLink] = useState('');
  const [linkResult, setLinkResult] = useState('');

  const pickImageFromGallery = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("गैलरी की अनुमति देना जरूरी है!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const checkScamLink = () => {
    if (!scamLink.trim()) {
      alert("कृपया पहले कोई लिंक या मैसेज यहाँ लिखें!");
      return;
    }
    // यहाँ 'scamLink' बिल्कुल सही लिखा गया है
    if (scamLink.includes('http') || scamLink.includes('offer') || scamLink.includes('win') || scamLink.includes('lottery')) {
      setLinkResult('⚠️ चेतावनी: यह लिंक संदिग्ध या फ्रॉड हो सकता है! इस पर क्लिक न करें।');
    } else {
      setLinkResult('✅ यह लिंक सामान्य लग रहा है, फिर भी सतर्क रहें।');
    }
  };

  const onShareApp = async () => {
    await Share.share({ message: 'सावधान! ऑनलाइन फ्रॉड, डीपफेक और स्कैम से बचने के लिए "Fraud Face Detector" ऐप इस्तेमाल करें।' });
  };

  if (url) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f172a', paddingTop: 40 }}>
        <View style={styles.webHeader}>
          <TouchableOpacity onPress={() => setUrl(null)}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>⬅ ऐप होम पर वापस जाएं</Text>
          </TouchableOpacity>
        </View>
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
      </View>
    );
  }

  if (currentScreen === 'settings') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.webHeader}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>⬅ होम पर जाएं</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.headerTitle, {marginVertical: 20}]}>⚙️ App Settings & Info</Text>

        <View style={styles.settingCard}>
          <Text style={styles.settingTitle}>🛡️ About App</Text>
          <Text style={styles.settingDesc}>Fraud Face Detector - Cyber Security & Scam Checker v2.0</Text>
        </View>

        <View style={styles.settingCard}>
          <Text style={styles.settingTitle}>🔒 Privacy & Security Policy</Text>
          <Text style={styles.settingDesc}>आपका कोई भी डेटा या फोटो हमारे सर्वर पर सेव नहीं किया जाता है।</Text>
        </View>

        <TouchableOpacity style={styles.settingCard} onPress={onShareApp}>
          <Text style={styles.settingTitle}>⭐ Rate Our App</Text>
          <Text style={styles.settingDesc}>प्ले स्टोर पर हमें 5-स्टार रेटिंग दें</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (currentScreen === 'bankList') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.webHeader}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>⬅ होम पर जाएं</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.headerTitle, {marginVertical: 20}]}>🏦 बैंक खाता/कार्ड ब्लॉक नंबर</Text>
        <Text style={{color: '#cbd5e1', marginBottom: 15, fontSize: 13}}>फ्रॉड होने पर तुरंत अपने बैंक के नंबर पर कॉल करें:</Text>

        <TouchableOpacity style={styles.bankCard} onPress={() => Linking.openURL('tel:1800112211')}>
          <Text style={styles.bankName}>SBI (स्टेट बैंक ऑफ इंडिया)</Text>
          <Text style={styles.bankNumber}>📞 1800 11 2211</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bankCard} onPress={() => Linking.openURL('tel:18002586161')}>
          <Text style={styles.bankName}>HDFC बैंक</Text>
          <Text style={styles.bankNumber}>📞 1800 258 6161</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bankCard} onPress={() => Linking.openURL('tel:18004194000')}>
          <Text style={styles.bankName}>ICICI बैंक</Text>
          <Text style={styles.bankNumber}>📞 1800 419 4000</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bankCard} onPress={() => Linking.openURL('tel:01204456000')}>
          <Text style={styles.bankName}>Paytm Payments Bank</Text>
          <Text style={styles.bankNumber}>📞 0120 4456 000</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.headerTitle}>Fraud Face Detector</Text>
          <Text style={styles.subTitle}>Cyber Security & Scam Checker</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => setCurrentScreen('settings')}>
          <Text style={{fontSize: 22}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checklist}>
        <Text style={{color:'#fff', fontWeight:'bold', marginBottom:10}}>🛡️ सुरक्षा चेकलिस्ट:</Text>
        <Text style={styles.checkText}>✅ अनजान लिंक या APK फाइल डाउनलोड न करें</Text>
        <Text style={styles.checkText}>✅ किसी को भी अपना OTP या UPI पिन न बताएं</Text>
      </View>

      <View style={styles.scannerBox}>
        <Text style={{color: '#38bdf8', fontWeight: 'bold', marginBottom: 5}}>🔍 संदिग्ध लिंक / मैसेज जाँच करें:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="यहाँ संदिग्ध लिंक या मैसेज पेस्ट करें..."
          placeholderTextColor="#64748b"
          value={scamLink}
          onChangeText={setScamLink}
        />
        <TouchableOpacity style={styles.checkBtn} onPress={checkScamLink}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>जाँच करें (Check Scam)</Text>
        </TouchableOpacity>
        {linkResult ? <Text style={styles.resultText}>{linkResult}</Text> : null}
      </View>

      <TouchableOpacity style={styles.orangeBtn} onPress={pickImageFromGallery}>
        <Text style={styles.btnText}>📷 गैलरी से फोटो/स्क्रीनशॉट स्कैन करें</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Text style={{color: '#38bdf8', marginBottom: 5}}>चुनी गई फोटो:</Text>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        </View>
      )}

      <TouchableOpacity style={styles.blueBtn} onPress={() => setUrl('https://cybercrime.gov.in')}>
        <Text style={styles.btnText}>🌐 राष्ट्रीय साइबर क्राइम पोर्टल (In-App)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.purpleBtn} onPress={() => setCurrentScreen('bankList')}>
        <Text style={styles.btnText}>🏦 बैंक खाता और कार्ड ब्लॉक नंबर</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.greenBtn} onPress={onShareApp}>
        <Text style={styles.btnText}>🔗 देशहित में ऐप दोस्तों को शेयर करें</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.redCard} onPress={() => Linking.openURL('tel:1930')}>
        <Text style={styles.cardTitle}>📞 1930 - साइबर हेल्पलाइन (तत्काल कॉल)</Text>
        <Text style={styles.cardSub}>फ्रॉड होने पर एक क्लिक में पुलिस को कॉल करें</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>© 2026 Cyber Security & Scam Checker</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  webHeader: { height: 60, backgroundColor: '#1e293b', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 10, borderRadius: 8 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#38bdf8' },
  subTitle: { fontSize: 13, color: '#38bdf8', fontStyle: 'italic' },
  settingsBtn: { backgroundColor: '#1e293b', padding: 8, borderRadius: 8 },
  checklist: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, marginBottom: 15 },
  checkText: { color: '#cbd5e1', fontSize: 13, marginVertical: 2 },
  scannerBox: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, marginBottom: 15 },
  inputBox: { backgroundColor: '#0f172a', color: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#334155', marginBottom: 10 },
  checkBtn: { backgroundColor: '#0284c7', padding: 10, borderRadius: 6, alignItems: 'center' },
  resultText: { color: '#f87171', marginTop: 8, fontSize: 13, fontWeight: 'bold' },
  orangeBtn: { backgroundColor: '#f59e0b', padding: 18, borderRadius: 10, marginBottom: 10 },
  blueBtn: { backgroundColor: '#0284c7', padding: 18, borderRadius: 10, marginBottom: 10 },
  purpleBtn: { backgroundColor: '#7c3aed', padding: 18, borderRadius: 10, marginBottom: 10 },
  greenBtn: { backgroundColor: '#059669', padding: 18, borderRadius: 10, marginBottom: 20 },
  redCard: { backgroundColor: '#b91c1c', padding: 18, borderRadius: 10, marginBottom: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 15 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardSub: { color: '#fee2e2', fontSize: 12 },
  settingCard: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, marginBottom: 15 },
  settingCardTitle: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  settingTitle: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  settingDesc: { color: '#cbd5e1', fontSize: 13 },
  bankCard: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, marginBottom: 12, borderLeftWidth: 5, borderLeftColor: '#7c3aed' },
  bankName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bankNumber: { color: '#38bdf8', fontSize: 14, marginTop: 4 },
  imageContainer: { alignItems: 'center', marginBottom: 15, backgroundColor: '#1e293b', padding: 10, borderRadius: 10 },
  previewImage: { width: 200, height: 200, borderRadius: 10 },
  footer: { textAlign: 'center', color: '#475569', marginTop: 10, marginBottom: 40 }
});
                   
