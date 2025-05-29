import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';

export default function PersonalizationScreen({navigation}) {


  return (
    <SafeAreaView style={styles.container}>
      
      <View>
        <View style={{marginTop:"10%"}}>
          <ProgressBar progress={14.28} />
        </View>

        <Text style={styles.title}>Your Journey Matters. Let's discover how Preachly can empower your faith</Text>

        <Text style={styles.text}>When it comes to your faith, what do you need most right now?</Text>


        <View>
            <Text>Clarity to overcome doubts</Text>
            <Text>Confidence to share my beliefs</Text>
        </View>
      </View>

      <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"not yet"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', padding: 20},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingTop: 40, paddingBottom: 30},
  text: {fontFamily:'NunitoBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap', paddingBottom: 50}

})