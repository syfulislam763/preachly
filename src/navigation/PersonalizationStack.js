import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalizationScreen from '../screens/personalization/PersonalizationScreen';
import PersonalizationScreen1 from '../screens/personalization/PersonalizationScreen1';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import PersonalizationScreen2 from '../screens/personalization/PersonalizationScreen2';
import { commonNavigationOptions } from '../components/Constant';
import PersonalizationScreen3 from '../screens/personalization/PersonalizationScreen3';
import PersonalizationScreen4 from '../screens/personalization/PersonalizationScreen4';
import PersonalizationScreen5 from '../screens/personalization/PersonalizationScreen5';

import PersonalizationScreen6 from '../screens/personalization/PersonalizationScreen6';
import Notification from '../screens/personalization/Notification';
import SubscriptionConfirmedScreen from '../screens/subscription/SubscriptionConfirmedScreen';
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';
import MainTabs from './MainTabs';
import MessageScreen from '../screens/tabs/Message/MessageScreen';
import { useAuth } from '../context/AuthContext';


const NotFound = () => <View>
  <Text>Not Found</Text>
</View>

const Stack = createNativeStackNavigator();

export default function PersonalizationStack() {

  const {store} = useAuth()
  
  return (
    <Stack.Navigator>

      {store?.onboarding_completed ?<Stack.Screen 
         options={({ navigation }) => ({
          headerShown:false
        })} 
        name="MainTabs" 
        component={store?.onboarding_completed?MainTabs:NotFound} 
      /> : <Stack.Screen 
        options={()=> ({
          headerShown: false
        })}
        name="Personalization" 
        component={PersonalizationScreen} 
      />
      }
      <Stack.Screen 
        options={commonNavigationOptions}
        name="Personalization1" 
        component={PersonalizationScreen1} 
      />
      <Stack.Screen 
        options={commonNavigationOptions}
        name="Personalization2" 
        component={PersonalizationScreen2} 
      />
      <Stack.Screen 
        options={commonNavigationOptions}
        name="Personalization3" 
        component={PersonalizationScreen3} 
      />
      <Stack.Screen 
        options={commonNavigationOptions}
        name="Personalization4" 
        component={PersonalizationScreen4} 
      />
      <Stack.Screen 
        options={commonNavigationOptions}
        name="Personalization5" 
        component={PersonalizationScreen5} 
      />

      <Stack.Screen 
        options={commonNavigationOptions}
        name="Personalization6" 
        component={PersonalizationScreen6} 
      />

      <Stack.Screen 
        options={commonNavigationOptions}
        name="Notification" 
        component={Notification} 
      />

{/*  */}
      <Stack.Screen 
         options={({ navigation }) => ({
          title: "Subscription",
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
            backgroundColor: '#ffebc2',
          },
        })} 
        name="SubscriptionScreen" 
        component={SubscriptionScreen} 
      />

      <Stack.Screen 
        options={({ navigation }) => ({
          title: "Subscription",
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
        })} 
        name="SubscriptionConfirmedScreen" 
        component={SubscriptionConfirmedScreen} 
      />


      <Stack.Screen 
         options={({ navigation }) => ({
          headerShown:false,
          presentation:'modal'
        })} 
        name="MessageScreen" 
        component={MessageScreen} 
      />


    </Stack.Navigator>
  );
}


