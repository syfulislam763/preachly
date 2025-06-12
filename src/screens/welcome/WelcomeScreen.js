import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import ImageSlider from '../../components/Slider';
import FooterBar from '../../components/FooterBar';

import CustomCarousel from '../../components/CustomCarousel';
import useLayoutDimention from '../../hooks/useLayoutDimention';
const {height, width} = Dimensions.get("window")

export default function WelcomeScreen({ navigation }) {
  
  

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>

      
      {/* <ImageSlider /> */}
      <CustomCarousel/>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AuthHome')}> 
          <Text style={styles.btnText}>Begin Your Journey</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height*0.05,
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
