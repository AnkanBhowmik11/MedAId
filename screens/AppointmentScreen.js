import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function AppointmentScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    sex: 'Male',
    age: '18',
    symptoms: ''
  });
  const [loading, setLoading] = useState(false);

  const handleFindDoctors = async () => {
    if (!form.symptoms.trim()) {
      Alert.alert("Missing Info", "Please describe symptoms");
      return;
    }

    setLoading(true);

    try {
      // AI call to Groq for doctor suggestion
      const doctorList = [
        { name: 'Dr. Anjali Sinha', specialization: 'General Physician' },
        { name: 'Dr. Rohit Mehta', specialization: 'Orthopedic Surgeon' },
        { name: 'Dr. Priya Verma', specialization: 'Dermatologist' }
      ];

      const prompt = `These are the available doctors: ${doctorList
        .map(doc => doc.name + ' - ' + doc.specialization)
        .join(', ')}.\nBased on the symptoms: "${form.symptoms}", recommend the most suitable ones.`;

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'You are a medical assistant that helps route patients to relevant doctors.' },
            { role: 'user', content: prompt }
          ]
        },
        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json'
          }
        }
      );

      const suggestion = response.data.choices[0].message.content;
      navigation.navigate('DoctorList', { form, aiSuggestion: suggestion });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to get doctor recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Request</Text>

      <TextInput style={styles.input} placeholder="Patient Name" onChangeText={text => setForm({ ...form, name: text })} />

      <Text style={styles.label}>Sex</Text>
      <Picker selectedValue={form.sex} style={styles.input} onValueChange={(itemValue) => setForm({ ...form, sex: itemValue })}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Age</Text>
      <Picker selectedValue={form.age} style={styles.input} onValueChange={(itemValue) => setForm({ ...form, age: itemValue })}>
        {[...Array(83)].map((_, i) => (
          <Picker.Item key={i} label={(i + 18).toString()} value={(i + 18).toString()} />
        ))}
      </Picker>

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Describe your symptoms"
        multiline
        onChangeText={text => setForm({ ...form, symptoms: text })}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleFindDoctors}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Find Doctors'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 4, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#1A237E', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});