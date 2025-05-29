import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/tabs/Home/HomeScreen';

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HistoryStack" component={HomeScreen} />
    </Stack.Navigator>
  );
}