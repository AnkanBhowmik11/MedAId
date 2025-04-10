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
import axios from 'axios';

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
      // MOCK: Replace this with your own API integration if needed
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResult = "The image suggests signs of mild inflammation in the upper lobe. Further investigation (e.g., CT scan) is recommended.";

      // If you're using a real API, it might look like this:
      /*
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'upload.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer YOUR_API_KEY',
        },
      });

      const mockResult = response.data.diagnosis;
      */

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

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      {image && !uploading && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit for Analysis</Text>
        </TouchableOpacity>
      )}

      {uploading && <ActivityIndicator size="large" color="#F1AB86" style={{ marginTop: 20 }} />}

      {diagnosis && (
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
    backgroundColor: '#1E2D2F',
    padding: 24,
    paddingBottom: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#F7DBA7',
    fontWeight: '700',
    marginBottom: 20,
  },
  pickButton: {
    backgroundColor: '#C57B57',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  pickButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#F1AB86',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: -10,
  },
  submitButtonText: {
    color: '#041F1E',
    fontSize: 16,
    fontWeight: '700',
  },
  resultBox: {
    backgroundColor: '#2C3E3F',
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
    width: '100%',
  },
  resultTitle: {
    color: '#F7DBA7',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultText: {
    color: '#F1AB86',
    fontSize: 16,
    lineHeight: 22,
  },
});
