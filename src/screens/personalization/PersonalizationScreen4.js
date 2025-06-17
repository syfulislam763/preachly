import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';

export default function PersonalizationScreen({navigation}) {


  return (
    <View style={styles.container}>
      
      <View>
        <View style={{}}>
          <ProgressBar progress={14.28*5} />
        </View>

        <Text style={styles.title}>How familiar are you with the Bible</Text>


        <View style={styles.imageContainer}>
            <Image 
              source={require("../../../assets/img/NoneSelector.png")}
              style={styles.img}
            />
            <Image 
              source={require("../../../assets/img/littleSelector.png")}
              style={styles.img}
            />
            <Image 
              source={require("../../../assets/img/lotSelector.png")}
              style={styles.img}
            />
        </View>

        <View style={{paddingHorizontal:25, paddingVertical:30}}>
            <Text style={styles.text}>A great foundation! Let's go deeper</Text>
            <View style={{height:15}}></View>
            <Text style={styles.text}>You have some knowledge, and we'll build on it!</Text>
        </View>

        <View style={{alignItems:'center'}}>
            <Text style={styles.subtitle}>In-Depth Responses</Text>

            <Text style={styles.semitext}>Preachly's answers will include context connections, and deeper insights to enrich your understanding</Text>
        </View>



      </View>

      <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"Personalization5"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', padding: 10, paddingBottom:30},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingVertical: 40, paddingHorizontal: 40, color:'#0B172A', lineHeight:35},
  subtitle: {fontFamily:'NunitoBold', fontSize: 25, color: deepGreen},
  text: {fontFamily:'NunitoSemiBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap'},
  semitext: {color:'#90B2B2', fontFamily:'NunitoRegular', fontSize:16, textAlign:'center', flexWrap:'wrap', paddingVertical:30},
  img: { height:130,width: 120, objectFit:'contain'},
  imageContainer: {display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'#fff'}


})