import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './tabs/HomeStack';
import HistoryStack from './tabs/HistoryStack';
import MessageStack from './tabs/MessageStack';
import PreachlyStack from './tabs/PreachlyStack';
import ProfileStack from './tabs/ProfileStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Message" component={MessageStack} />
      <Tab.Screen name="Preachly" component={PreachlyStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}