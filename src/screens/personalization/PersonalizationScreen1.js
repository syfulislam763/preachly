import React, { useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import CustomSelect from '../../components/CustomSelect';
import SelectableCard from '../../components/SelectableCard';
import QuestionSlider from '../../components/QuestionSlider';


export default function PersonalizationScreen1({navigation}) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    

  return (
    <View style={styles.container}>
      
      <View style={{}}>
        <ProgressBar progress={14.28*2}/>
        
        <Text style={styles.title}>Select your denomination</Text>

        <CustomSelect/>

      </View>

      <View style={{paddingBottom:45}}>
        <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"Personalization2"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1,backgroundColor:'#fff',justifyContent:'space-between', padding:10},
  title: {fontFamily:'DMSerifDisplay', fontSize:32, padding: 42, textAlign:'center', color:'#0B172A', lineHeight:35},
 
})