import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AppointmentConfirmScreen({ route }) {
  const { doctor, form } = route.params;
  const [date, setDate] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Appointment</Text>
      <Text style={styles.subtitle}>With: {doctor.name}</Text>
      <Text>Specialization: {doctor.specialization}</Text>
      <Text>Fee: {doctor.fee}</Text>

      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => selectedDate && setDate(selectedDate)}
      />

      <TouchableOpacity style={styles.bookBtn} onPress={() => setConfirmed(true)}>
        <Text style={styles.bookBtnText}>Book for {date.toDateString()}</Text>
      </TouchableOpacity>

      {confirmed && <Text style={styles.success}>✅ Appointment Confirmed!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 6 },
  bookBtn: { backgroundColor: '#1A237E', padding: 12, marginTop: 20, borderRadius: 6 },
  bookBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  success: { marginTop: 20, fontSize: 18, color: 'green', textAlign: 'center' },
});
