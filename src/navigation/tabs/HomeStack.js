import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/tabs/Home/HomeScreen';
import Calender from '../../screens/tabs/Profile/Calendar'

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen name="HistoryStack" component={HomeScreen} />
      <Stack.Screen name='Calendar' component={Calender}/>
    </Stack.Navigator>
  );
}