import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageScreen from '../../screens/tabs/Message/MessageScreen';

const Stack = createNativeStackNavigator();

export default function MessageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MessageMain" component={MessageScreen} />
    </Stack.Navigator>
  );
}