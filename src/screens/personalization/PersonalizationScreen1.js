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

    // const data = [
    //     {
    //     title: 'Practical and Everyday',
    //     description: 'Grounded and solution-oriented, focusing on how faith applies to daily life',
    //     quote: 'Sometimes life feels messy, but God uses even our mistakes to shape us and teach us how to walk in His ways',
    //     icon: require("../../../assets/img/24-leaf.png")
    //     },
    //     {
    //     title: 'Practical and Logical ',
    //     description: 'Grounded and solution-oriented, focusing on how faith applies to daily life',
    //     quote: 'Sometimes life feels messy, but God uses even our mistakes to shape us and teach us how to walk in His ways',
    //     icon: require("../../../assets/img/24-sunset.png")
    //     },
    // ];

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
  title: {fontFamily:'DMSerifDisplay', fontSize:32, padding: 42, textAlign:'center'},
 
})