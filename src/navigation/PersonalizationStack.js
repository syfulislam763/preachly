import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalizationScreen from '../screens/personalization/PersonalizationScreen';

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



    </Stack.Navigator>
  );
}