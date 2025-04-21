import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const doctors = [
  {
    id: '1',
    name: 'Dr. Anjali Sinha',
    qualification: 'MBBS, MD (Medicine)',
    specialization: 'General Physician',
    fee: '₹500',
    image: 'https://i.ibb.co/JFt3J9c/doctor1.png'
  },
  {
    id: '2',
    name: 'Dr. Rohit Mehta',
    qualification: 'MBBS, MS (Ortho)',
    specialization: 'Orthopedic Surgeon',
    fee: '₹800',
    image: 'https://i.ibb.co/Dg0KbnM/doctor2.png'
  }
];

export default function DoctorListScreen({ route, navigation }) {
  const { form } = route.params;

  const handleSelectDoctor = (doctor) => {
    navigation.navigate('ConfirmAppointment', { form, doctor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Doctors</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.qualification}</Text>
              <Text>{item.specialization}</Text>
              <Text style={styles.fee}>Consultation: {item.fee}</Text>
              <TouchableOpacity style={styles.bookButton} onPress={() => handleSelectDoctor(item)}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 10, marginBottom: 16, padding: 10 },
  image: { width: 80, height: 80, borderRadius: 40, marginRight: 12 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  fee: { marginTop: 6, fontWeight: '600' },
  bookButton: { backgroundColor: '#3949AB', padding: 10, marginTop: 8, borderRadius: 6, alignItems: 'center' },
  bookButtonText: { color: 'white', fontWeight: 'bold' },
});
