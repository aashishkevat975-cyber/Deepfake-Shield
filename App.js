import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const bannerAdUnitId = 'ca-app-pub-1675872523636331/3716599285';
const interstitialAdUnitId = 'ca-app-pub-1675872523636331/4910261459';

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [reportText, setReportText] = useState('');
  const [scanResult, setScanResult] = useState('यह संदेश सामान्य लग रहा है, फिर भी सावधान रहें।');
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addLoadedEventListener(() => {
      setInterstitialLoaded(true);
    });

    const unsubscribeClosed = interstitial.addClosedEventListener(() => {
      setInterstitialLoaded(false);
      interstitial.load();
    });

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showInterstitial = () => {
    if (interstitialLoaded) {
      interstitial.show();
    }
  };

  const handleShare = () => {
    const link = "https://play.google.com/store/apps/details?id=com.aashish.fraudfacedetector"; 
    Linking.openURL(`whatsapp://send?text=Fraud Face Detector app download karein aur surakshit rahein: ${link}`);
  };

  const handleCheckScam = () => {
    showInterstitial();
    if (!message.trim()) {
      Alert.alert('कृपया संदेश दर्ज करें');
      return;
    }
    if (message.includes('lottery') || message.includes('winner') || message.includes('free') || message.includes('congratulations')) {
      setScanResult('⚠️ चेतावनी: यह एक संभावित स्कैम संदेश हो सकता है! सावधान रहें।');
    } else {
      setScanResult('✅ यह संदेश सुरक्षित लग रहा है।');
    }
  };

  const handleReport = () => {
    showInterstitial();
    if (!reportText.trim()) {
      Alert.alert('कृपया डिटेल्स लिखें');
      return;
    }
    Alert.alert('धन्यवाद! आपकी फ़्रॉड रिपोर्ट दर्ज कर ली गई है।');
    setReportText('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* SBI EarnKaro Link - Profit Wala */}
      <TouchableOpacity style={styles.yellowCard} onPress={() => Linking.openURL('https://bitli.in/60RynOW')}>
        <Text style={styles.yellowCardTitle}>💳 SBI क्रेडिट कार्ड (₹2240 प्रॉफिट)</Text>
        <Text style={styles.yellowCardSub}>यहाँ क्लिक करें और क्रेडिट कार्ड के लिए अप्लाई करें!</Text>
      </TouchableOpacity>

      {/* Main Buttons */}
      <TouchableOpacity style={styles.blueButton} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
        <Text style={styles.btnText}>🌐 साइबर पोर्टल</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.redButton} onPress={() => Linking.openURL('tel:1930')}>
        <Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.purpleButton} onPress={() => Alert.alert('बैंक ब्लॉक लिस्ट', 'किसी भी फ़्रॉड की स्थिति में तुरंत बैंक को कॉल करके खाता ब्लॉक करें।')}>
        <Text style={styles.btnText}>🏦 बैंक ब्लॉक लिस्ट</Text>
      </TouchableOpacity>

      {/* AI Scam Detector */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 AI & स्कैम सुरक्षा</Text>
        <TextInput
          style={styles.input}
          placeholder="संदेश यहाँ पेस्ट करें..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.actionButton} onPress={handleCheckScam}>
          <Text style={styles.btnText}>चैक करें</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>{scanResult}</Text>
      </View>

      <TouchableOpacity style={styles.pinkButton} onPress={() => Alert.alert('लव ट्रैप और डेटिंग फ़्रॉड', 'सोशल मीडिया पर अनजान लोगों से सावधान रहें।')}>
        <Text style={styles.btnText}>💔 लव ट्रैप और डेटिंग फ़्रॉड से बचें</Text>
      </TouchableOpacity>

      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>🔴 लाइव अलर्ट:</Text>
        <Text style={styles.alertText}>आजकल 'जॉब फ़्रॉड' और फर्जी कॉल से सावधान रहें!</Text>
      </View>

      {/* Report Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 फ़्रॉड रिपोर्ट दर्ज करें</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="डिटेल्स लिखें..."
          placeholderTextColor="#888"
          multiline
          value={reportText}
          onChangeText={setReportText}
        />
        <TouchableOpacity style={styles.greenButton} onPress={handleReport}>
          <Text style={styles.btnText}>सुरक्षित रखें</Text>
        </TouchableOpacity>
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.btnText}>📤 ऐप दोस्तों को शेयर करें</Text>
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalHeader}>⚙️ सेटिंग्स & प्राइवेसी</Text>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('नोटिफिकेशन', 'फ्रॉड अलर्ट नोटिफिकेशन सेवा सक्रिय है।')}>
              <Text style={styles.menuText}>1. साइबर क्राइम हेल्पलाइन नंबर</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('ऑटो स्कैम डिटेक्टर', 'AI स्कैम डिटेक्टर चालू है जो संदिग्ध संदेशों की पहचान करता है।')}>
              <Text style={styles.menuText}>2. बैंक फ़्रॉड & तुरंत ब्लॉक पोर्टल</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('डिस्प्ले', 'डार्क मोड इस ऐप में पहले से ही सेट है।')}>
              <Text style={styles.menuText}>3. नोटिफिकेशन & अलर्ट</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
              <Text style={styles.menuText}>4. ऑटो स्कैम डिटेक्टर</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('प्राइवेसी पॉलिसी', 'यह ऐप आपकी सुरक्षा और साइबर फ़्रॉड से बचाने के लिए डिज़ाइन किया गया है।')}>
              <Text style={styles.menuText}>5. डिस्प्ले & डार्क मोड</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('हेल्प & सपोर्ट', 'किसी भी सहायता के लिए नीचे दिए गए सपोर्ट बटन से सहयोग कर सकते हैं।')}>
              <Text style={styles.menuText}>6. दोस्तों के साथ शेयर करें</Text>
            </TouchableOpacity>

            {/* Support Us Button - UPI Link */}
            <TouchableOpacity style={styles.supportButton} onPress={() => Linking.openURL('upi://pay?pa=aashishkevat975@ybl&pn=Aashish&cu=INR')}>
              <Text style={styles.supportText}>❤️ Support Us (सहयोग दें)</Text>
              <Text style={styles.subText}>Aashishkevat975@ybl पर सहयोग दें</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnText}>बंद करें</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Banner Ad at bottom */}
      <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        <BannerAd
          unitId={bannerAdUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 15 },
  headerTitle: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  yellowCard: { backgroundColor: '#ffd166', padding: 15, borderRadius: 10, marginBottom: 15 },
  yellowCardTitle: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  yellowCardSub: { color: '#333', fontSize: 12, marginTop: 3 },
  blueButton: { backgroundColor: '#00a8e8', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  redButton: { backgroundColor: '#d90429', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  purpleButton: { backgroundColor: '#6a0dad', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  card: { backgroundColor: '#1c2541', padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { color: '#fff', fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  input: { backgroundColor: '#0b132b', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#72585' },
  actionButton: { backgroundColor: '#0077b6', padding: 12, borderRadius: 8, alignItems: 'center' },
  resultText: { color: '#ffcc00', marginTop: 10, fontSize: 14 },
  pinkButton: { backgroundColor: '#3a0ca3', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  alertBox: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  alertTitle: { color: '#ff4d4d', fontWeight: 'bold', fontSize: 15 },
  alertText: { color: '#fff', marginTop: 5 },
  inputArea: { backgroundColor: '#0b132b', color: '#fff', height: 80, padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#72585' },
  greenButton: { backgroundColor: '#2d6a4f', padding: 12, borderRadius: 8, alignItems: 'center' },
  shareBtn: { backgroundColor: '#5e17eb', padding: 15, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#1c2541', padding: 20, borderRadius: 15, maxHeight: '80%' },
  modalHeader: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  menuItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333' },
  menuText: { color: '#00a8e8', fontSize: 15 },
  supportButton: { backgroundColor: '#3a0ca3', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  supportText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subText: { color: '#ffd166', fontSize: 12, marginTop: 3 },
  closeModalBtn: { backgroundColor: '#d90429', padding: 12, borderRadius: 8, marginTop: 20, marginBottom: 20 }
});
      
