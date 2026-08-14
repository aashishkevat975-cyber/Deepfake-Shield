import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/* हेडर */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fraud Face Detector</Text>
        <Text style={styles.headerSub}>फेक फोटो और ऑनलाइन फ्रॉड की जाँच करें</Text>
      </View>

      <View style={styles.motivationBox}>
        <Text style={styles.motivationText}>सतर्क रहें! किसी भी संदिग्‍ध फोटो या लिंक की तुरंत जाँच करें।</Text>
      </View>

      {/* फोटो पिक करने वाला मुख्य बटन */}
      <TouchableOpacity 
        style={styles.pickPhotoBtn} 
        onPress={() => Linking.openURL('https://cybercrime.gov.in')}
      >
        <Text style={styles.pickPhotoText}>📷 PICK PHOTO (फोटो चुनें)</Text>
      </TouchableOpacity>

      {/* आधिकारिक सहायता और लिंक्स */}
      <Text style={styles.sectionTitle}>आधिकारिक सहायता और लिंक्स</Text>
      
      <TouchableOpacity 
        style={[styles.btnBox, styles.alertBtn]} 
        onPress={() => Linking.openURL('https://cybercrime.gov.in')}
      >
        <Text style={styles.btnBoldWhite}>साइबर फ्रॉड रिपोर्ट करें (CyberCrime.gov.in)</Text>
        <Text style={styles.btnSpanWhite}>भारत सरकार के आधिकारिक पोर्टल पर शिकायत दर्ज करें</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btnBox} 
        onPress={() => Linking.openURL('https://cybercrime.gov.in')}
      >
        <Text style={styles.btnBold}>फेक लिंक और मैसेज की जाँच करें</Text>
        <Text style={styles.btnSpan}>ऑनलाइन स्कैम से बचने के लिए आधिकारिक टूल</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btnBox} 
        onPress={() => Linking.openURL('https://cybercrime.gov.in')}
      >
        <Text style={styles.btnBold}>साइबर हेल्पलाइन (1930) जानकारी</Text>
        <Text style={styles.btnSpan}>वित्तीय फ्रॉड होने पर तुरंत मदद लें</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10, paddingTop: 40 },
  header: { backgroundColor: '#1e293b', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#38bdf8' },
  headerSub: { fontSize: 11, color: '#94a3b8', marginTop: 3 },
  motivationBox: { backgroundColor: '#1e293b', padding: 10, borderRadius: 6, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#0ea5e9' },
  motivationText: { fontSize: 12, fontWeight: 'bold', color: '#38bdf8', textAlign: 'center' },
  sectionTitle: { backgroundColor: '#1e293b', color: '#cbd5e1', padding: 8, borderRadius: 6, fontSize: 13, fontWeight: 'bold', marginVertical: 10 },
  pickPhotoBtn: { backgroundColor: '#0ea5e9', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 5 },
  pickPhotoText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  btnBox: { backgroundColor: '#1e293b', padding: 12, borderRadius: 6, marginVertical: 6, borderWidth: 1, borderColor: '#334155' },
  alertBtn: { backgroundColor: '#dc2626', borderWidth: 0 },
  btnBold: { fontSize: 14, fontWeight: 'bold', color: '#38bdf8' },
  btnSpan: { fontSize: 10, color: '#94a3b8', marginTop: 2 },
  btnBoldWhite: { fontSize: 14, fontWeight: 'bold', color: 'white' },
  btnSpanWhite: { fontSize: 10, color: '#fee2e2', marginTop: 2 },
});
          
