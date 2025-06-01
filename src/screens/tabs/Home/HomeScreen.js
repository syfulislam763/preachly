import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import HomepageHeader from '../../../components/HomepageHeader';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
        <HomepageHeader/>
    </SafeAreaView>
  );
}