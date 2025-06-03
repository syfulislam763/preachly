import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/tabs/Profile/ProfileScreen';
import ProfileNotification from '../../screens/tabs/Profile/ProfileNotification';
import Calendar from '../../screens/tabs/Profile/Calendar';
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator 
    >
      <Stack.Screen options={{headerShown:false}} name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen options={{
        title: 'Notifications',
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'NunitoSemiBold',
          color: '#0b172A',
          fontSize: 18
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#fff',
        },
      }} name="ProfileNotification" component={ProfileNotification} />
      <Stack.Screen options={{
        title: 'Calendar',
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'NunitoSemiBold',
          color: '#0b172A',
          fontSize: 18
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#fff',
        },
      }} name="Calendar" component={Calendar} />





    </Stack.Navigator>
  );
}