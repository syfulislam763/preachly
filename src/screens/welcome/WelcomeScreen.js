import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import ImageSlider from '../../components/Slider';
import FooterBar from '../../components/FooterBar';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>

      
      <ImageSlider />
      

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AuthHome')}> 
          <Text style={styles.btnText}>Begin Your Journey</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor:'#fff'
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '21%',
  },
  btn: {
    backgroundColor: '#005A55',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    width: '80%',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  }
})
