import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import QuestionSlider from '../../components/QuestionSlider';
import useLayoutDimention from '../../hooks/useLayoutDimention';
import {getStyles} from './personalizationScreen2Style'

export default function PersonalizationScreen2({navigation}) {
  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()

  const styles = getStyles(isSmall, isMedium, isLarge, isFold)

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

