import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Homescreen';
import SymptomCheckerScreen from './screens/SymptomCheckerScreen';
import ImageDiagnosisScreen from './screens/ImageDiagnosisScreen';
import VitalsDashboardScreen from './screens/VitalsDashboardScreen';
// ✅ Step 2: Import the new screen and add to Stack.Navigator
import AppointmentScreen from './screens/AppointmentScreen';
import DoctorListScreen from './screens/DoctorListScreen';
import AppointmentConfirmScreen from './screens/AppointmentConfirmScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Symptom Checker" component={SymptomCheckerScreen} />
        <Stack.Screen name="Image Diagnosis" component={ImageDiagnosisScreen} />
        <Stack.Screen name="Vitals" component={VitalsDashboardScreen} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
  <Stack.Screen name="DoctorList" component={DoctorListScreen} />
  <Stack.Screen name="ConfirmAppointment" component={AppointmentConfirmScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
"plugins"; [
  [
    "expo-health-connect",
    {
      "healthConnectPermissions": [
        "ActivitySession:read",
        "HeartRate:read",
        "Steps:read",
        "Sleep:read",
        "BloodGlucose:read",
        "BloodPressure:read",
        "OxygenSaturation:read"
      ]
    }
  ]
]