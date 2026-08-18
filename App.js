import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [message, setMessage] = useState('');
  const [reportText, setReportText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [scanResult, setScanResult] = useState('यह संदेश सामान्य लग रहा है, फिर भी सावधान रहें।');

  // Check Scam Function
  const handleCheckScam = () => {
    if (!message.trim()) {
      Alert.alert('कृपया संदेश दर्ज करें');
      return;
    }
    if (message.includes('lottery') || message.includes('winner') || message.includes('free') || message.includes('loan') || message.includes('jeete')) {
      setScanResult('⚠️ चेतावनी: यह एक संभावित स्कैम संदेश हो सकता है! सावधान रहें।');
    } else {
      setScanResult('✅ यह संदेश सुरक्षित लग रहा है।');
    }
  };

  // Submit Report
  const handleReport = () => {
    if (!reportText.trim()) {
      Alert.alert('कृपया डिटेल्स लिखें');
      return;
    }
    Alert.alert('धन्यवाद! आपका सुधार दर्ज कर लिया गया है।');
    setReportText('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Yellow Bank Offer & Loan Section */}
      <TouchableOpacity style={styles.yellowCard} onPress={() => Alert.alert('लोन सेवा', 'यहाँ से लोन के लिए अप्लाई करें और सुरक्षित रहें।')}>
        <Text style={styles.yellowCardTitle}>🛡️ सुरक्षित बैंक ऑफर्स (यहाँ देखें)</Text>
        <Text style={styles.yellowCardSub}>सरकारी/बैंक ऑफर्स - यहाँ से लोन के लिए अप्लाई करें और सुरक्षित रहें</Text>
      </TouchableOpacity>

      {/* Main Security Tools */}
      <TouchableOpacity style={styles.blueButton} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>
        <Text style={styles.btnText}>🌐 साइबर पोर्टल</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.redButton} onPress={() => Linking.openURL('tel:1930')}>
        <Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.purpleButton} onPress={() => Alert.alert('बैंक ब्लॉक लिस्ट', 'यहाँ सभी प्रमुख बैंकों के नंबर हैं जहाँ फ्रॉड होने पर कॉल कर सकते हैं।')}>
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

      <TouchableOpacity style={styles.pinkButton} onPress={() => Alert.alert('लव ट्रैप और डेटिंग फ्रॉड', 'सोशल मीडिया पर अनजान लोगों से सतर्क रहें और अपनी व्यक्तिगत जानकारी साझा न करें।')}>
        <Text style={styles.btnText}>💔 लव ट्रैप और डेटिंग फ्रॉड से बचें</Text>
      </TouchableOpacity>
      
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>🔴 लाइव अलर्ट:</Text>
        <Text style={styles.alertText}>आजकल 'जॉब फ्रॉड' और फर्जी कॉल्स से बचकर रहें!</Text>
      </View>

      {/* Report Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 फ्रॉड रिपोर्ट दर्ज करें</Text>
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

      <TouchableOpacity style={styles.shareBtn} onPress={() => Alert.alert('शेयर करें', 'शैक्षणिक नोट्स ऐप डाउनलोड करें और हर शेयर पर ₹50 पाएं!\nhttps://appsgeyser.com')}>
        <Text style={styles.btnText}>📤 ऐप दोस्तों को शेयर करें (डाउनलोड बढ़ाएं)</Text>
      </TouchableOpacity>

      {/* Settings Modal (Popup Menu) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>⚙️ सेटिंग्स और मेनू</Text>

            <TouchableOpacity style={styles.modalItem} onPress={() => Alert.alert('मेरा वॉलेट', 'आपका वॉलेट बैलेंस: ₹50 (शेयर करने पर और मिलेंगे)\nUPI ID: aashishkevat975@ybl')}>
              <Text style={styles.modalItemText}>💰 मेरा वॉलेट (₹50)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalItem} onPress={() => Alert.alert('नोटिफिकेशन', 'नोटिफिकेशन सेवा चालू है। आपको नए नोट्स की जानकारी मिलती रहेगी।')}>
              <Text style={styles.modalItemText}>🔔 नोटिफिकेशन सेटिंग</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalItem} onPress={() => Alert.alert('सपोर्ट', 'UPI ID: aashishkevat975@ybl\nयहाँ से सीधे पैसे ट्रांसफर कर सकते हैं या सहायता ले सकते हैं।')}>
              <Text style={styles.modalItemText}>🤝 हेल्प और सपोर्ट (WhatsApp / UPI)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalItem} onPress={() => Alert.alert('टेलीग्राम', 'हमारा आधिकारिक टेलीग्राम चैनल ज्वाइन करें।')}>
              <Text style={styles.modalItemText}>📢 टेलीग्राम चैनल ज्वाइन करें</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalItem} onPress={() => Alert.alert('रेटिंग', 'कृपया ऐप को 5-स्टार रेटिंग देकर हमारा समर्थन करें!')}>
              <Text style={styles.modalItemText}>⭐ ऐप को रेटिंग दें</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalItem} onPress={() => Alert.alert('जानकारी', 'ऐप वर्जन: v1.0 (लेटेस्ट)\nFraud Face Detector & Study Notes App')}>
              <Text style={styles.modalItemText}>ℹ️ ऐप की जानकारी (About)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnText}>बंद करें</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 15 },
  headerTitle: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  yellowCard: { backgroundColor: '#ffd166', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  yellowCardTitle: { color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  yellowCardSub: { color: '#333', fontSize: 12, textAlign: 'center', marginTop: 4 },
  blueButton: { backgroundColor: '#00a8e8', padding: 15, borderRadius: 10, marginBottom: 10 },
  redButton: { backgroundColor: '#d90429', padding: 15, borderRadius: 10, marginBottom: 10 },
  purpleButton: { backgroundColor: '#6a0dad', padding: 15, borderRadius: 10, marginBottom: 20 },
  card: { backgroundColor: '#1c2541', padding: 15, borderRadius: 10, marginBottom: 20 },
  cardTitle: { color: '#fff', fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#0b132b', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  actionButton: { backgroundColor: '#0077b6', padding: 15, borderRadius: 5 },
  resultText: { color: '#ffcc00', marginTop: 10, fontSize: 13 },
  pinkButton: { backgroundColor: '#3a0ca3', padding: 15, borderRadius: 10, marginBottom: 20, borderColor: '#f72585', borderWidth: 1 },
  alertBox: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginBottom: 20 },
  alertTitle: { color: '#ff4d4d', fontWeight: 'bold' },
  alertText: { color: '#fff' },
  inputArea: { backgroundColor: '#0b132b', color: '#fff', height: 80, padding: 10, borderRadius: 5, marginBottom: 10 },
  greenButton: { backgroundColor: '#2d6a4f', padding: 15, borderRadius: 5 },
  shareBtn: { backgroundColor: '#5e17eb', padding: 15, borderRadius: 10, marginBottom: 50 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#1c2541', padding: 20, borderRadius: 15 },
  modalHeader: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalItem: { backgroundColor: '#0b132b', padding: 12, borderRadius: 8, marginBottom: 10 },
  modalItemText: { color: '#fff', fontSize: 15 },
  closeModalBtn: { backgroundColor: '#d90429', padding: 12, borderRadius: 8, marginTop: 10 }
});
        
