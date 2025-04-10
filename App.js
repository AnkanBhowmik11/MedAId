import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SymptomCheckerScreen from './screens/SymptomCheckerScreen';
import ImageDiagnosisScreen from './screens/ImageDiagnosisScreen';
import VitalsDashboardScreen from './screens/VitalsDashboardScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Symptom Checker" component={SymptomCheckerScreen} />
        <Stack.Screen name="Image Diagnosis" component={ImageDiagnosisScreen} />
        <Stack.Screen name="Vitals" component={VitalsDashboardScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
