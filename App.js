import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const bannerAdUnitId = 'ca-app-pub-1675872523636331/3716599285';
const interstitialAdUnitId = 'ca-app-pub-1675872523636331/4910261459';
const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [reportText, setReportText] = useState('');
  const [scanResult, setScanResult] = useState('यह संदेश सामान्य लग रहा है, फिर भी सावधान रहें।');

  const showInterstitial = () => {
    interstitial.load();
    interstitial.show();
  };

  const handleShare = () => {
    const link = "https://play.google.com/store/apps/details?id=com.aashish.fraudfacedetector"; 
    Linking.openURL(`whatsapp://send?text=Fraud Face Detector app download karein: ${link}`);
  };

  const handleCheckScam = () => {
    showInterstitial();
    if (message.includes('lottery') || message.includes('winner') || message.includes('free')) {
      setScanResult('⚠️ चेतावनी: यह स्कैम हो सकता है!');
    } else {
      setScanResult('✅ यह संदेश सुरक्षित लग रहा है।');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* SBI EarnKaro Link - Profit Wala */}
      <TouchableOpacity style={styles.yellowCard} onPress={() => Linking.openURL('https://bitli.in/60RynOW')}>
        <Text style={styles.yellowCardTitle}>💳 SBI क्रेडिट कार्ड (₹2240 प्रॉफिट)</Text>
        <Text style={styles.yellowCardSub}>यहाँ क्लिक करें और अप्लाई करें!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blueButton} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
        <Text style={styles.btnText}>🌐 साइबर पोर्टल</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.redButton} onPress={() => Linking.openURL('tel:1930')}>
        <Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 AI स्कैम सुरक्षा</Text>
        <TextInput style={styles.input} placeholder="संदेश यहाँ पेस्ट करें..." placeholderTextColor="#888" value={message} onChangeText={setMessage} />
        <TouchableOpacity style={styles.actionButton} onPress={handleCheckScam}>
          <Text style={styles.btnText}>चैक करें</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>{scanResult}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 फ़्रॉड रिपोर्ट दर्ज करें</Text>
        <TextInput style={styles.inputArea} placeholder="डिटेल्स लिखें..." multiline value={reportText} onChangeText={setReportText} />
        <TouchableOpacity style={styles.greenButton} onPress={() => { showInterstitial(); Alert.alert('धन्यवाद!'); }}>
          <Text style={styles.btnText}>सबमिट करें</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        <BannerAd unitId={bannerAdUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>⚙️ सेटिंग्स</Text>
            <TouchableOpacity style={styles.menuItem} onPress={handleShare}><Text style={styles.menuText}>दोस्तों को शेयर करें</Text></TouchableOpacity>
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModalVisible(false)}><Text style={styles.btnText}>बंद करें</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 },
  headerTitle: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  yellowCard: { backgroundColor: '#ffd166', padding: 15, borderRadius: 10, marginBottom: 15 },
  yellowCardTitle: { fontWeight: 'bold', fontSize: 16 },
  blueButton: { backgroundColor: '#00a8e8', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  redButton: { backgroundColor: '#d90429', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  card: { backgroundColor: '#1c2541', padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { color: '#fff', fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#0b132b', color: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#fff' },
  actionButton: { backgroundColor: '#0077b6', padding: 12, marginTop: 10, borderRadius: 8, alignItems: 'center' },
  resultText: { color: '#ffcc00', marginTop: 10 },
  inputArea: { backgroundColor: '#0b132b', color: '#fff', height: 80, padding: 10, borderRadius: 8 },
  greenButton: { backgroundColor: '#2d6a4f', padding: 12, marginTop: 10, borderRadius: 8, alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#1c2541', padding: 20, borderRadius: 15 },
  menuItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#333' },
  menuText: { color: '#fff', fontSize: 16 },
  closeModalBtn: { backgroundColor: '#d90429', padding: 12, marginTop: 20, borderRadius: 8 }
});
        
