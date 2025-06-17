import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import QuestionSlider from '../../components/QuestionSlider';

export default function PersonalizationScreen2({navigation}) {


  return (
    <View style={styles.container}>
      
      <View>
        <View style={{}}>
          <ProgressBar progress={14.28*3} />
        </View>

        <Text style={styles.title}>What brings you to Preachly</Text>

        <Text style={styles.text}>We'll personalize recommendations based on your goals</Text>


      <QuestionSlider/>
        

       
      </View>

      <CommonButton
          btnText={"Next Question"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"Personalization3"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', paddingHorizontal: 20, paddingBottom: 60, paddingTop:10},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingTop: 35, paddingBottom: 25, paddingHorizontal: 70, color:'#0B172A', lineHeight:35},
  text: {fontFamily:'NunitoSemiBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap', paddingBottom: 50, paddingHorizontal: 20},
  
})