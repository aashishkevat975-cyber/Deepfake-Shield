import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Linking } from 'react-native';

export default function App() {
  const [messageText, setMessageText] = useState('');
  const [checkResult, setCheckResult] = useState('संदेश यहाँ लिखें...');

  const myAffiliateLink = 'https://bitli.in/SVwCT5P'; 

  const handleCheck = () => {
    const lower = messageText.toLowerCase();
    if (lower.includes('lottery') || lower.includes('otp') || lower.includes('won')) {
      setCheckResult('⚠️ चेतावनी: यह फ्रॉड हो सकता है!');
    } else {
      setCheckResult('✅ यह संदेश सुरक्षित लग रहा है।');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* एकदम चमकदार और बड़ा बटन */}
        <TouchableOpacity style={styles.earnButton} onPress={() => Linking.openURL(myAffiliateLink)}>
          <Text style={styles.earnButtonText}>🛡️ सुरक्षित बैंक कार्ड्स (यहाँ देखें)</Text>
          <Text style={{fontWeight: 'bold', fontSize: 12}}>सरकारी/बैंक ऑफर्स</Text>
        </TouchableOpacity>

        <View style={styles.sectionBox}>
          <Text style={styles.title}>🤖 स्कैम डिटेक्टर</Text>
          <TextInput style={styles.input} placeholder="संदेश यहाँ पेस्ट करें..." value={messageText} onChangeText={setMessageText} multiline={true} />
          <TouchableOpacity style={styles.btn} onPress={handleCheck}><Text style={styles.btnText}>चैक करें</Text></TouchableOpacity>
          <Text style={styles.result}>{checkResult}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' }, // डार्क ब्लैक बैकग्राउंड ताकि बटन चमके
  scrollContent: { padding: 20 },
  earnButton: { backgroundColor: '#FFD700', paddingVertical: 25, borderRadius: 25, marginBottom: 25, alignItems: 'center', borderWidth: 3, borderColor: '#FF4500', elevation: 12 },
  earnButtonText: { color: '#000', fontWeight: '900', fontSize: 18, textTransform: 'uppercase' },
  sectionBox: { backgroundColor: '#1c2541', padding: 20, borderRadius: 15 },
  title: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#0b132b', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, minHeight: 100 },
  btn: { backgroundColor: '#4361ee', padding: 18, borderRadius: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  result: { color: '#FFD700', marginTop: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
