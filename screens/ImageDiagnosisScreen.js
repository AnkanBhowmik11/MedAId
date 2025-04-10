import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageDiagnosisScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Camera roll permissions are required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDiagnosis('');
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select an image first.");
      return;
    }

    setUploading(true);
    setDiagnosis('');

    try {
      // MOCK diagnosis — simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResult =
        "🩻 The image suggests signs of mild inflammation in the upper lobe. Further investigation (e.g., CT scan) is recommended.";

      setDiagnosis(mockResult);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Image analysis failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Image Diagnosis</Text>

      <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
        <Text style={styles.pickButtonText}>Select Image</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.preview} />
      )}

      {image && !uploading && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit for Analysis</Text>
        </TouchableOpacity>
      )}

      {uploading && (
        <ActivityIndicator size="large" color="#1A237E" style={{ marginTop: 20 }} />
      )}

      {diagnosis !== '' && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Diagnosis Result</Text>
          <Text style={styles.resultText}>{diagnosis}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 24,
  },
  pickButton: {
    backgroundColor: '#3949AB',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  pickButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  preview: {
    width: '100%',
    height: 280,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 30,
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#1A237E',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
