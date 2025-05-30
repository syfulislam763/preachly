import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalizationScreen from '../screens/personalization/PersonalizationScreen';
import PersonalizationScreen1 from '../screens/personalization/PersonalizationScreen1';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PersonalizationScreen2 from '../screens/personalization/PersonalizationScreen2';
import { commonNavigationOptions } from '../components/Constant';



const Stack = createNativeStackNavigator();

export default function PersonalizationStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen 
        options={()=> ({
          headerShown: false
        })}
        name="Personalization" 
        component={PersonalizationScreen} 
      />
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



    </Stack.Navigator>
  );
}


