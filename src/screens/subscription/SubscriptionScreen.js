import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function SubscriptionScreen() {
  const { completeSubscription } = useAuth();

  return (
    <View>
      <Text>Subscribe to continue</Text>
      <Button title="Subscribe" onPress={completeSubscription} />
    </View>
  );
}
