import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#041F1E" />

      <Text style={styles.title}>MedAId</Text>
      <Text style={styles.subtitle}>Your AI-powered health assistant</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Symptom Checker')}
      >
        <Text style={styles.buttonText}>Symptom Checker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Image Diagnosis')}
      >
        <Text style={styles.buttonText}>Image Diagnosis</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041F1E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#F7DBA7',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#F1AB86',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#C57B57',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
