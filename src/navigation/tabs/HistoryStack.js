import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../../screens/tabs/History/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HistoryStack" component={HistoryScreen} />
    </Stack.Navigator>
  );
}