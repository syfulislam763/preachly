import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


export default function PersonalizationScreen({navigation}) {


  return (
    <SafeAreaView style={styles.container}>
      
      <View>
        <View style={{marginTop:"10%"}}>
          <ProgressBar progress={14.28} />
        </View>

        <Text style={styles.title}>Your Journey Matters. Let's discover how Preachly can empower your faith</Text>

        <Text style={styles.text}>When it comes to your faith, what do you need most right now?</Text>


        <View style={styles.imageContainer}>
            <Image 
              source={require("../../../assets/img/Selector1.png")}
              style={styles.img}
            />
            <Image 
              source={require("../../../assets/img/Selector.png")}
              style={styles.img}
            />
        </View>
      </View>

      <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"Personalization1"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', padding: 20, paddingBottom:27},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingTop: 40, paddingBottom: 30,color:'#0B172A', lineHeight: 35},
  text: {fontFamily:'NunitoBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap', paddingBottom: 50},
  img: { height:hp("15%"),width: wp("44%"), objectFit:'contain'},
  imageContainer: {display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor: '#fff', }

})