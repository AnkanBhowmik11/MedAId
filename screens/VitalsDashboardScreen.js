// screens/VitalsDashboardScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';


export default function VitalsDashboardScreen() {
  const [vitals, setVitals] = useState({
    heartRate: 76,
    oxygen: 98,
    steps: 3540,
    temperature: 36.8,
  });

  // Authorize Google Fit + simulate vitals
  useEffect(() => {
    const authorizeGoogleFit = async () => {
      const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ,
          Scopes.FITNESS_HEART_RATE_READ,
          Scopes.FITNESS_BODY_READ,
        ],
      };

      GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            console.log('✅ Google Fit authorized');
            // You can now fetch real data here
          } else {
            Alert.alert('Google Fit Error', 'Authorization failed.');
          }
        })
        .catch(err => console.error('Google Fit error', err));
    };

    authorizeGoogleFit();

    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: Math.floor(65 + Math.random() * 20),
        oxygen: Math.floor(96 + Math.random() * 3),
        steps: prev.steps + Math.floor(Math.random() * 10),
        temperature: (36 + Math.random()).toFixed(1),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vitals Monitor</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Heart Rate</Text>
        <Text style={styles.value}>{vitals.heartRate} bpm</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Blood Oxygen</Text>
        <Text style={styles.value}>{vitals.oxygen} %</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Temperature</Text>
        <Text style={styles.value}>{vitals.temperature} °C</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Steps Today</Text>
        <Text style={styles.value}>{vitals.steps}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#041F1E',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    color: '#F7DBA7',
    fontWeight: '700',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1E2D2F',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#F1AB86',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F7DBA7',
  },
});
