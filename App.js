import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Share, Switch } from 'react-native';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // होम पेज सबसे पहले खुलेगा
  const [activeSetting, setActiveSetting] = useState(null);
  
  // सेटिंग्स के स्विच स्टेट्स
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoScan, setAutoScan] = useState(true);

  const openSettingDetail = (title, type) => {
    setActiveSetting({ title, type });
    setCurrentView('setting-detail');
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message: 'इस Fraud Face Detector ऐप से साइबर फ्रॉड से बचें! ऐप डाउनलोड करें: https://play.google.com/store/apps/details?id=com.fraud.facedetector',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. होम पेज (आपके सारे पुराने फीचर्स बिल्कुल सुरक्षित हैं) */}
      {currentView === 'home' && (
        <View>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={() => alert('होम पेज पर हैं')}>
              <Text style={styles.backBtnText}>← होम पर जाएं</Text>
            </TouchableOpacity>
            {/* सेटिंग्स आइकॉन */}
            <TouchableOpacity onPress={() => setCurrentView('settings')}>
              <Text style={{fontSize: 24}}>⚙️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Fraud Face Detector</Text>

          {/* आपके होम पेज के मुख्य फीचर्स */}
          <TouchableOpacity style={styles.homeCard} onPress={() => alert('फेस स्कैनिंग शुरू हो रही है...')}>
            <Text style={styles.homeCardTitle}>🔍 संदिग्ध चेहरा स्कैन करें</Text>
            <Text style={styles.homeCardDesc}>स्कैमर्स और फ्रॉड चेहरों की पहचान करें</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeCard} onPress={() => alert('मैसेज स्कैनर ओपन हो रहा है...')}>
            <Text style={styles.homeCardTitle}>💬 फ्रॉड मैसेज चेकर</Text>
            <Text style={styles.homeCardDesc}>लॉटरी या फर्जी SMS की जांच करें</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeCard} onPress={() => setCurrentView('settings')}>
            <Text style={styles.homeCardTitle}>⚙️ सेटिंग्स & प्राइवेसी</Text>
            <Text style={styles.homeCardDesc}>हेल्पलाइन नंबर, शेयर और अन्य सेटिंग्स</Text>
          </TouchableOpacity>

          <View style={styles.supportBox}>
            <Text style={styles.supportTitle}>❤️ Support Us (सहयोग करें)</Text>
            <Text style={styles.supportDesc}>Aashishkevat975@ybl पर सहयोग देकर इस ऐप को आगे बढ़ाएं।</Text>
          </View>
        </View>
      )}

      {/* 2. सेटिंग्स मेनू पेज (यहाँ से आप असली फोन जैसी सेटिंग्स खोलेंगे) */}
      {currentView === 'settings' && (
        <View>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('home')}>
            <Text style={styles.backBtnText}>← होम पर वापस</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>⚙️ सेटिंग्स & प्राइवेसी</Text>

          <TouchableOpacity style={styles.settingItem} onPress={() => openSettingDetail('साइबर क्राइम हेल्पलाइन', 'helpline')}>
            <View>
              <Text style={styles.settingTitle}>1. साइबर क्राइम हेल्पलाइन नंबर</Text>
              <Text style={styles.settingDesc}>1930 नंबर और आधिकारिक वेबसाइट लिंक</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => openSettingDetail('बैंक अकाउंट ब्लॉक सूची', 'bank')}>
            <View>
              <Text style={styles.settingTitle}>2. बैंक फ्रॉड & तुरंत ब्लॉक नंबर</Text>
              <Text style={styles.settingDesc}>SBI, PNB, HDFC और अन्य बैंकों के हेल्पलाइन</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => openSettingDetail('स्कैम अलर्ट नोटिफिकेशन', 'notif')}>
            <View>
              <Text style={styles.settingTitle}>3. नोटिफिकेशन & अलर्ट</Text>
              <Text style={styles.settingDesc}>नए ऑनलाइन फ्रॉड अलर्ट प्राप्त करें</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => openSettingDetail('ऑटो स्कैन सुरक्षा', 'scan')}>
            <View>
              <Text style={styles.settingTitle}>4. ऑटो स्कैम डिटेक्टर</Text>
              <Text style={styles.settingDesc}>संदिग्ध संदेशों की स्वचालित जांच</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => openSettingDetail('डार्क मोड', 'dark')}>
            <View>
              <Text style={styles.settingTitle}>5. डिस्प्ले & डार्क मोड</Text>
              <Text style={styles.settingDesc}>आंखों की सुरक्षा के लिए थीम बदलें</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={shareApp}>
            <View>
              <Text style={styles.settingTitle}>6. दोस्तों के साथ शेयर करें</Text>
              <Text style={styles.settingDesc}>लिंक के साथ WhatsApp पर भेजें</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => openSettingDetail('प्राइवेसी पॉलिसी', 'privacy')}>
            <View>
              <Text style={styles.settingTitle}>7. प्राइवेसी पॉलिसी & सुरक्षा</Text>
              <Text style={styles.settingDesc}>आपका डेटा और पहचान पूरी तरह सुरक्षित</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => openSettingDetail('हेल्प & सपोर्ट', 'help')}>
            <View>
              <Text style={styles.settingTitle}>8. हेल्प & सपोर्ट</Text>
              <Text style={styles.settingDesc}>हमसे संपर्क करें</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 3. सेटिंग्स के अंदर खुलने वाला सब-पेज (नया विंडो) */}
      {currentView === 'setting-detail' && (
        <View>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('settings')}>
            <Text style={styles.backBtnText}>← सेटिंग्स पर वापस</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{activeSetting?.title}</Text>

          <View style={styles.subContentBox}>
            {activeSetting?.type === 'helpline' && (
              <View>
                <Text style={styles.subTextBold}>🚨 नेशनल साइबर क्राइम हेल्पलाइन:</Text>
                <Text style={styles.subText}>तुरंत कॉल करें: 1930</Text>
                <Text style={styles.subText} style={{marginTop: 10}}>वेबसाइट: cybercrime.gov.in</Text>
                <Text style={styles.subDesc}>यदि आपके साथ ऑनलाइन ठगी हुई है, तो तुरंत 1930 पर कॉल करें ताकि पैसे बचाए जा सकें।</Text>
              </View>
            )}

            {activeSetting?.type === 'bank' && (
              <View>
                <Text style={styles.subTextBold}>🏦 प्रमुख बैंक हेल्पडेस्क:</Text>
                <Text style={styles.subText}>• SBI: 1800-1122-11</Text>
                <Text style={styles.subText}>• PNB: 1800-180-2222</Text>
                <Text style={styles.subText}>• HDFC: 1800-258-3838</Text>
                <Text style={styles.subDesc}>खाता ब्लॉक करने के लिए सीधे अपने बैंक को सूचित करें।</Text>
              </View>
            )}

            {activeSetting?.type === 'notif' && (
              <View style={styles.row}>
                <Text style={styles.subTextBold}>नए स्कैम अलर्ट नोटिफिकेशन</Text>
                <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
              </View>
            )}

            {activeSetting?.type === 'scan' && (
              <View style={styles.row}>
                <Text style={styles.subTextBold}>ऑटोमेटिक स्कैम चेकिंग</Text>
                <Switch value={autoScan} onValueChange={setAutoScan} />
              </View>
            )}

            {activeSetting?.type === 'dark' && (
              <View style={styles.row}>
                <Text style={styles.subTextBold}>डार्क थीम (Dark Mode)</Text>
                <Switch value={darkMode} onValueChange={setDarkMode} />
              </View>
            )}

            {activeSetting?.type === 'privacy' && (
              <Text style={styles.subDesc}>आपका डेटा पूरी तरह सुरक्षित है। यह ऐप केवल फ्रॉड से बचाने के लिए डिज़ाइन किया गया है।</Text>
            )}

            {activeSetting?.type === 'help' && (
              <Text style={styles.subDesc}>किसी भी सहायता के लिए हमारी सपोर्ट टीम से संपर्क करें। हम आपकी मदद के लिए हमेशा तैयार हैं।</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 15, paddingTop: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  backBtn: { backgroundColor: '#1e293b', padding: 10, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 15 },
  backBtnText: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#ffffff', marginBottom: 20 },
  
  homeCard: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', padding: 18, borderRadius: 12, marginBottom: 15 },
  homeCardTitle: { color: '#38bdf8', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  homeCardDesc: { color: '#94a3b8', fontSize: 13 },

  settingItem: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingTitle: { color: '#38bdf8', fontSize: 15, fontWeight: 'bold', marginBottom: 3 },
  settingDesc: { color: '#94a3b8', fontSize: 12 },
  arrow: { color: '#94a3b8', fontSize: 22, fontWeight: 'bold' },

  supportBox: { backgroundColor: '#312e81', borderWidth: 1, borderColor: '#4f46e5', padding: 15, borderRadius: 10, marginTop: 15, marginBottom: 30 },
  supportTitle: { color: '#f87171', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  supportDesc: { fontSize: 13, color: '#cbd5e1' },

  subContentBox: { backgroundColor: '#1e293b', padding: 20, borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: '#334155' },
  subTextBold: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  subText: { color: '#38bdf8', fontSize: 14, marginBottom: 5 },
  subDesc: { color: '#cbd5e1', fontSize: 13, marginTop: 10, lineHeight: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
