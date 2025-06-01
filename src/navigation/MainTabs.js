import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './tabs/HomeStack';
import HistoryStack from './tabs/HistoryStack';
import MessageStack from './tabs/MessageStack';
import PreachlyStack from './tabs/PreachlyStack';
import ProfileStack from './tabs/ProfileStack';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const home = require("../../assets/img/24-house.png")
const history = require("../../assets/img/24-history.png")
const chat = require("../../assets/img/24-chat.png")
const book = require("../../assets/img/24-Book.png")
const profile = require("../../assets/img/24-user.png")

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let icon
            if (route.name === 'Home') {
              icon = focused ? home : home;
            } else if (route.name === 'History') {
              icon = focused ? history : history;
            }
            else if(route.name === "Message"){
              icon = focused ? chat : chat;
            }
            else if(route.name === "Preachly"){
              icon = focused ? book : book;
            }else{
              icon = focused ? profile : profile;
            }
            return <Image style={{
              height:24,
              width:24,
              objectFit:'contain'
            }} source={icon}/>;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 100,
            paddingBottom: 30,
            paddingTop: 30,
            position: 'absolute',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: -2 },
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
    
    >
      <Tab.Screen
        name="Home" 
        component={HomeStack} 
      />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Message" component={MessageStack} />
      <Tab.Screen name="Preachly" component={PreachlyStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}