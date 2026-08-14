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
      alert("कृपया पहले कोई लिंक यहाँ लिखें!");
      return;
    }
    if (scamLink.includes('http') || scamLink.includes('offer') || scamLink.includes('win') || scamLink.includes('lottery')) {
      setLinkResult('⚠️ चेतावनी: यह लिंक संदिग्ध या फ्रॉड हो सकता है!');
    } else {
      setLinkResult('✅ यह लिंक सामान्य लग रहा है, फिर भी सतर्क रहें।');
    }
  };

  const onShareApp = async () => {
    await Share.share({ message: 'सावधान! ऑनलाइन फ्रॉड और स्कैम से बचने के लिए "Fraud Face Detector" ऐप इस्तेमाल करें।' });
  };

  if (url) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f172a', paddingTop: 40 }}>
        <View style={styles.webHeader}>
          <TouchableOpacity onPress={() => setUrl(null)}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>⬅ वापस जाएं</Text>
          </TouchableOpacity>
        </View>
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
      </View>
    );
  }

  if (currentScreen === 'settings') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.webHeader}>
          <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>⬅ होम पर जाएं</Text>
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, {marginVertical: 20}]}>⚙️ App Settings</Text>
        <View style={styles.settingCard}>
          <Text style={styles.settingTitle}>🛡️ About App</Text>
          <Text style={styles.settingDesc}>Fraud Face Detector v2.0</Text>
        </View>
        <View style={styles.settingCard}>
          <Text style={styles.settingTitle}>🔒 Privacy Policy</Text>
          <Text style={styles.settingDesc}>आपका डेटा पूरी तरह सुरक्षित है।</Text>
        </View>
      </ScrollView>
    );
  }

  if (currentScreen === 'bankList') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.webHeader}>
          <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>⬅ होम पर जाएं</Text>
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, {marginVertical: 20}]}>🏦 बैंक ब्लॉक नंबर</Text>
        <TouchableOpacity style={styles.bankCard} onPress={() => Linking.openURL('tel:1800112211')}>
          <Text style={styles.bankName}>SBI: 1800 11 2211</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bankCard} onPress={() => Linking.openURL('tel:18002586161')}>
          <Text style={styles.bankName}>HDFC: 1800 258 6161</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.headerTitle}>Fraud Face Detector</Text>
          <Text style={styles.subTitle}>Cyber Security Shield</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => setCurrentScreen('settings')}>
          <Text style={{fontSize: 20}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scannerBox}>
        <TextInput
          style={styles.inputBox}
          placeholder="संदिग्ध लिंक यहाँ पेस्ट करें..."
          placeholderTextColor="#64748b"
          value={scamLink}
          onChangeText={setScamLink}
        />
        <TouchableOpacity style={styles.checkBtn} onPress={checkScamLink}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>जाँच करें</Text>
        </TouchableOpacity>
        {linkResult ? <Text style={styles.resultText}>{linkResult}</Text> : null}
      </View>

      <TouchableOpacity style={styles.orangeBtn} onPress={pickImageFromGallery}>
        <Text style={styles.btnText}>📷 गैलरी से फोटो स्कैन करें</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        </View>
      )}

      <TouchableOpacity style={styles.blueBtn} onPress={() => setUrl('https://cybercrime.gov.in')}>
        <Text style={styles.btnText}>🌐 साइबर क्राइम पोर्टल</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.purpleBtn} onPress={() => setCurrentScreen('bankList')}>
        <Text style={styles.btnText}>🏦 बैंक ब्लॉक नंबर लिस्ट</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.greenBtn} onPress={onShareApp}>
        <Text style={styles.btnText}>🔗 ऐप शेयर करें</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.redCard} onPress={() => Linking.openURL('tel:1930')}>
        <Text style={styles.cardTitle}>📞 1930 - साइबर हेल्पलाइन</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  webHeader: { height: 50, backgroundColor: '#1e293b', justifyContent: 'center', paddingHorizontal: 15, marginBottom: 10, borderRadius: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#38bdf8' },
  subTitle: { fontSize: 12, color: '#38bdf8' },
  settingsBtn: { backgroundColor: '#1e293b', padding: 8, borderRadius: 8 },
  scannerBox: { backgroundColor: '#1e293b', padding: 12, borderRadius: 8, marginBottom: 12 },
  inputBox: { backgroundColor: '#0f172a', color: '#fff', padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#334155', marginBottom: 8 },
  checkBtn: { backgroundColor: '#0284c7', padding: 8, borderRadius: 6, alignItems: 'center' },
  resultText: { color: '#f87171', marginTop: 6, fontSize: 12, fontWeight: 'bold' },
  orangeBtn: { backgroundColor: '#f59e0b', padding: 15, borderRadius: 8, marginBottom: 10 },
  blueBtn: { backgroundColor: '#0284c7', padding: 15, borderRadius: 8, marginBottom: 10 },
  purpleBtn: { backgroundColor: '#7c3aed', padding: 15, borderRadius: 8, marginBottom: 10 },
  greenBtn: { backgroundColor: '#059669', padding: 15, borderRadius: 8, marginBottom: 10 },
  redCard: { backgroundColor: '#b91c1c', padding: 15, borderRadius: 8, marginBottom: 20, alignItems: 'center' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  settingCard: { backgroundColor: '#1e293b', padding: 12, borderRadius: 8, marginBottom: 10 },
  settingTitle: { color: '#38bdf8', fontSize: 14, fontWeight: 'bold' },
  settingDesc: { color: '#cbd5e1', fontSize: 12 },
  bankCard: { backgroundColor: '#1e293b', padding: 12, borderRadius: 8, marginBottom: 10 },
  bankName: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  imageContainer: { alignItems: 'center', marginBottom: 10, backgroundColor: '#1e293b', padding: 8, borderRadius: 8 },
  previewImage: { width: 150, height: 150, borderRadius: 8 }
});
                   
