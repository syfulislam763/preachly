import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/tabs/Home/HomeScreen';
import Calender from '../../screens/tabs/Profile/Calendar'
import CurrentGoals from '../../screens/tabs/Profile/CurrentGoals';
import BackButton from '../../components/BackButton';

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
      <Stack.Screen options={({navigation}) => ({
        title: 'Your Current Goals',
        headerTitleAlign: "center",
        headerShown: true,
        headerTitleStyle: {
          fontFamily: 'NunitoBold',
          color: '#0b172A',
          fontSize: 18
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#fff',
        },
        headerLeft: () => <BackButton navigation={navigation}/>
      })} name="CurrentGoals" component={CurrentGoals} />
    </Stack.Navigator>
  );
}