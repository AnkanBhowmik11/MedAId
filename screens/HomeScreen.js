import React,{ useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar } from 'react-native'; 


export default function HomeScreen({ navigation }) {

    const [symptom, setSymptom] = useState(''); // ✅

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/medaid_logo.png')} style={styles.logo} />
        <View>
          <Text style={styles.appName}><Text style={{ color: '#007BFF' }}>Med</Text><Text style={{ color: '#00BFA6' }}>AI</Text><Text style={{ color: '#007BFF' }}>d</Text></Text>
          <Text style={styles.tagline}>Your AI-powered Health assistant</Text>
        </View>
        <Image source={require('../assets/profile_icon.png')} style={styles.profileIcon} />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Check your <Text style={{ color: '#FFB300' }}>Symptoms</Text> with <Text style={{ color: '#00BFA6' }}>MedAId</Text>
        </Text>
        <View style={styles.searchContainer}>
        <TextInput
  placeholder="Enter symptom..."
  style={styles.searchInput}
  value={symptom}
  onChangeText={setSymptom}
/>

<TouchableOpacity
  style={styles.searchButton}
  onPress={() => {
    if (symptom.trim()) {
      navigation.navigate('Symptom Checker', { query: symptom.trim() });
    }
  }}
>
  <Text style={styles.searchIcon}>Send</Text>
</TouchableOpacity>

        </View>
      </View>

      {/* Feature Buttons */}
      <View style={styles.featureRow}>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Symptom Checker')}>
          <Image source={require('../assets/symptom_icon.png')} style={styles.featureIcon} />
          <Text>Symptom Checker</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Image Diagnosis')}>
          <Image source={require('../assets/image_diagnosis_icon.png')} style={styles.featureIcon} />
          <Text>Image Diagnosis</Text>
        </TouchableOpacity>
      </View>

      {/* Vitals Dashboard */}
      <Text style={styles.sectionTitle}>Vitals Dashboard</Text>
      <View style={styles.vitalsBox}>
        {/* Add vitals content here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 'auto',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 12,
    color: '#777',
  },
  banner: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#00BFA6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 18,
    color: '#fff',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featureButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderColor: '#00BFA6',
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  vitalsBox: {
    height: 120,
    borderColor: '#00BFA6',
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: '#F9F9F9',
  },
});
