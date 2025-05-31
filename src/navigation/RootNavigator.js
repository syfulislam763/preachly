import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import PersonalizationStack from './PersonalizationStack';
import MainTabs from './MainTabs';
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';
import { useAuth } from '../context/AuthContext';

export default function RootNavigator() {
  const { isAuthenticated, isPersonalized, isSubscribed } = useAuth();

  if (!isAuthenticated) return <AuthStack />;
  if (!isPersonalized) return <PersonalizationStack />;
  // if (!isSubscribed) return <SubscriptionScreen />;

  return <MainTabs />;
}