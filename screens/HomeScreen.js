import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar, ScrollView, Alert } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [symptom, setSymptom] = useState('');
  const [isHealthConnected, setIsHealthConnected] = useState(false);
  
  // Mock data for the vitals dashboard
  const [healthData, setHealthData] = useState({
    heartRate: { current: '72', min: '65', max: '88' },
    steps: { today: '6,254', goal: 10000, percent: 62 },
    sleep: { hours: '7.2', quality: 'Good' },
    oxygen: { level: '98' }
  });

  // Function to simulate connecting to health services
  const connectToHealthServices = () => {
    Alert.alert(
      "Connect to Google Fit",
      "This would connect to Google Fit in the full implementation.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Connect", 
          onPress: () => {
            setIsHealthConnected(true);
            Alert.alert("Successfully connected to health services!");
          }
        }
      ]
    );
  };

  // Function to simulate data refresh
  const refreshHealthData = () => {
    // This would fetch real data in the complete implementation
    Alert.alert("Refreshing health data...");
    
    // Update with new mock data to show it's working
    setHealthData({
      heartRate: { current: Math.floor(65 + Math.random() * 20).toString(), min: '65', max: '88' },
      steps: { 
        today: (Math.floor(3000 + Math.random() * 7000)).toLocaleString(), 
        goal: 10000, 
        percent: Math.floor(30 + Math.random() * 70)
      },
      sleep: { hours: (6 + Math.random() * 2).toFixed(1), quality: 'Good' },
      oxygen: { level: (95 + Math.random() * 5).toFixed(0) }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/medaid_logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.appName}>
              <Text style={{ color: '#007BFF' }}>Med</Text>
              <Text style={{ color: '#00BFA6' }}>AI</Text>
              <Text style={{ color: '#007BFF' }}>d</Text>
            </Text>
            <Text style={styles.tagline}>Your AI-powered Health assistant</Text>
          </View>
          <Image source={require('../assets/profile_icon.png')} style={styles.profileIcon} />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Check your <Text style={{ color: '#FFB300' }}>Symptoms</Text> with{' '}
            <Text style={{ color: '#00BFA6' }}>MedAId</Text>
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
          <TouchableOpacity
            style={styles.featureButton}
            onPress={() => navigation.navigate('Symptom Checker')}
          >
            <Image source={require('../assets/symptom_icon.png')} style={styles.featureIcon} />
            <Text>Symptom Checker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureButton}
            onPress={() => navigation.navigate('Image Diagnosis')}
          >
            <Image source={require('../assets/image_diagnosis_icon.png')} style={styles.featureIcon} />
            <Text>Image Diagnosis</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.featureRow}>
          <TouchableOpacity
            style={styles.featureButton}
            onPress={() => navigation.navigate('Appointment')}
          >
            <Image source={require('../assets/appointment_icon.png')} style={styles.featureIcon} />
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>

        {/* Vitals Dashboard */}
        <View style={styles.vitalsHeader}>
          <Text style={styles.sectionTitle}>Vitals Dashboard</Text>
          {!isHealthConnected ? (
            <TouchableOpacity 
              style={styles.connectButton}
              onPress={connectToHealthServices}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={refreshHealthData}
            >
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.vitalsContainer}>
          {/* Heart Rate Card */}
          <View style={styles.vitalCard}>
            <View style={styles.vitalHeaderRow}>
              <View style={styles.vitalIconContainer}>
                <Text style={styles.vitalIcon}>❤️</Text>
              </View>
              <Text style={styles.vitalTitle}>Heart Rate</Text>
            </View>
            <View style={styles.vitalDataRow}>
              <Text style={styles.vitalValue}>{healthData.heartRate.current}</Text>
              <Text style={styles.vitalUnit}>BPM</Text>
            </View>
            <View style={styles.vitalRangeRow}>
              <Text style={styles.vitalRangeText}>
                Min: {healthData.heartRate.min} | Max: {healthData.heartRate.max}
              </Text>
            </View>
          </View>

          {/* Steps Card */}
          <View style={styles.vitalCard}>
            <View style={styles.vitalHeaderRow}>
              <View style={styles.vitalIconContainer}>
                <Text style={styles.vitalIcon}>👣</Text>
              </View>
              <Text style={styles.vitalTitle}>Steps</Text>
            </View>
            <View style={styles.vitalDataRow}>
              <Text style={styles.vitalValue}>{healthData.steps.today}</Text>
              <Text style={styles.vitalUnit}>steps</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${healthData.steps.percent}%` }]} />
            </View>
            <Text style={styles.progressText}>{healthData.steps.percent}% of daily goal</Text>
          </View>

          {/* Sleep Card */}
          <View style={styles.vitalCard}>
            <View style={styles.vitalHeaderRow}>
              <View style={styles.vitalIconContainer}>
                <Text style={styles.vitalIcon}>😴</Text>
              </View>
              <Text style={styles.vitalTitle}>Sleep</Text>
            </View>
            <View style={styles.vitalDataRow}>
              <Text style={styles.vitalValue}>{healthData.sleep.hours}</Text>
              <Text style={styles.vitalUnit}>hours</Text>
            </View>
            <Text style={styles.qualityText}>Quality: {healthData.sleep.quality}</Text>
          </View>

          {/* Oxygen Card */}
          <View style={styles.vitalCard}>
            <View style={styles.vitalHeaderRow}>
              <View style={styles.vitalIconContainer}>
                <Text style={styles.vitalIcon}>🫁</Text>
              </View>
              <Text style={styles.vitalTitle}>Oxygen</Text>
            </View>
            <View style={styles.vitalDataRow}>
              <Text style={styles.vitalValue}>{healthData.oxygen.level}</Text>
              <Text style={styles.vitalUnit}>%</Text>
            </View>
            <Text style={styles.normalRangeText}>Normal range: 95-100%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  vitalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#00BFA6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  vitalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  vitalCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#00BFA6',
    padding: 12,
    marginBottom: 12,
  },
  vitalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vitalIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E6F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  vitalIcon: {
    fontSize: 16,
  },
  vitalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  vitalDataRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  vitalUnit: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
  vitalRangeRow: {
    marginTop: 4,
  },
  vitalRangeText: {
    fontSize: 11,
    color: '#888',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00BFA6',
  },
  progressText: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  qualityText: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  normalRangeText: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
});