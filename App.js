import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [message, setMessage] = useState('');
  const [reportText, setReportText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // WhatsApp Share Function with Direct Link
  const handleShare = () => {
    let appLink = "https://example.com/fraud-face-detector.apk"; // Yahan aap apni asli app ki download link daal sakte hain
    let shareMessage = "Fraud Face Detector app download karein aur cyber fraud se surakshit rahein! Abhi download karein: " + appLink;
    let url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareMessage);
    
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp nahi khul saka");
    });
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

      {/* SBI Loan Section */}
      <TouchableOpacity style={styles.yellowCard} onPress={() => Linking.openURL('https://www.onlinesbi.sbi')}>
        <Text style={styles.yellowCardTitle}>🛡️ सुरक्षित बैंक ऑफर्स</Text>
        <Text style={styles.yellowCardSub}>यहाँ क्लिक करें - SBI लोन के लिए अप्लाई करें और सुरक्षित रहें</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blueButton} onPress={() => Linking.openURL('https://cybercrime.gov.in')}><Text style={styles.btnText}>🌐 साइबर पोर्टल</Text></TouchableOpacity>
      <TouchableOpacity style={styles.redButton} onPress={() => Linking.openURL('tel:1930')}><Text style={styles.btnText}>📞 1930 हेल्पलाइन</Text></TouchableOpacity>
      <TouchableOpacity style={styles.purpleButton}><Text style={styles.btnText}>🏦 बैंक ब्लॉक लिस्ट</Text></TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 AI & स्कैम सुरक्षा</Text>
        <TextInput style={styles.input} placeholder="संदेश यहाँ पेस्ट करें..." placeholderTextColor="#888" value={message} onChangeText={setMessage} />
        <TouchableOpacity style={styles.actionButton}><Text style={styles.btnText}>चैक करें</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.pinkButton}><Text style={styles.btnText}>💔 लव ट्रैप और डेटिंग फ्रॉड से बचें</Text></TouchableOpacity>
      
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>🔴 लाइव अलर्ट:</Text>
        <Text style={styles.alertText}>आजकल 'जॉब फ्रॉड' और फर्जी कॉल्स से बचकर रहें!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 फ्रॉड रिपोर्ट दर्ज करें</Text>
        <TextInput style={styles.inputArea} placeholder="डिटेल्स लिखें..." placeholderTextColor="#888" multiline value={reportText} onChangeText={setReportText} />
        <TouchableOpacity style={styles.greenButton}><Text style={styles.btnText}>सुरक्षित रखें</Text></TouchableOpacity>
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.btnText}>📤 ऐप दोस्तों को शेयर करें (लिंक भेजें)</Text>
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>⚙️ सुरक्षा सेटिंग्स</Text>
            <TouchableOpacity style={styles.modalItem} onPress={() => Alert.alert('UPI सपोर्ट', 'सहयोग के लिए यहाँ UPI करें: aashishkevat975@ybl')}>
              <Text style={styles.modalItemText}>🤝 सपोर्ट (UPI: aashishkevat975@ybl)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem}><Text style={styles.modalItemText}>🛡️ प्राइवेसी पॉलिसी</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalItem}><Text style={styles.modalItemText}>📢 फ्रॉड अलर्ट नोटिफिकेशन</Text></TouchableOpacity>
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModalVisible(false)}><Text style={styles.btnText}>बंद करें</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginBottom: 15 },
  headerTitle: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  yellowCard: { backgroundColor: '#ffd166', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  yellowCardTitle: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  yellowCardSub: { color: '#333', fontSize: 12, textAlign: 'center' },
  blueButton: { backgroundColor: '#00a8e8', padding: 15, borderRadius: 10, marginBottom: 10 },
  redButton: { backgroundColor: '#d90429', padding: 15, borderRadius: 10, marginBottom: 10 },
  purpleButton: { backgroundColor: '#6a0dad', padding: 15, borderRadius: 10, marginBottom: 20 },
  card: { backgroundColor: '#1c2541', padding: 15, borderRadius: 10, marginBottom: 20 },
  cardTitle: { color: '#fff', fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#0b132b', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  actionButton: { backgroundColor: '#0077b6', padding: 15, borderRadius: 5 },
  pinkButton: { backgroundColor: '#3a0ca3', padding: 15, borderRadius: 10, marginBottom: 20, borderColor: '#f72585', borderWidth: 1 },
  alertBox: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginBottom: 20 },
  alertTitle: { color: '#ff4d4d', fontWeight: 'bold' },
  alertText: { color: '#fff' },
  inputArea: { backgroundColor: '#0b132b', color: '#fff', height: 80, padding: 10, borderRadius: 5, marginBottom: 10 },
  greenButton: { backgroundColor: '#2d6a4f', padding: 15, borderRadius: 5 },
  shareBtn: { backgroundColor: '#5e17eb', padding: 15, borderRadius: 10, marginBottom: 50 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#1c2541', padding: 20, borderRadius: 15 },
  modalHeader: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalItem: { backgroundColor: '#0b132b', padding: 15, borderRadius: 8, marginBottom: 10 },
  modalItemText: { color: '#fff', fontSize: 15 },
  closeModalBtn: { backgroundColor: '#d90429', padding: 12, borderRadius: 8, marginTop: 10 }
});
        
