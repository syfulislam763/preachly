import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import WeeklyCalendar from '../../components/WeeklyCalendar';


export default function PersonalizationScreen({navigation}) {


  return (
    <View style={styles.container}>
      
      <View>

        
        <ProgressBar progress={100} />


        <Text style={styles.title}>Your Daily Dose of Clarity, and Inspired Confidence</Text>


        <View style={{paddingHorizontal:20, paddingVertical:0}}>
            <Text style={styles.text}>Each day you show up strengthen your spiritual foundation. Build your streak, check in weekly, and unlock badges that reflect your growth</Text>
        </View>


        <View style={{paddingTop:25}}>
            <WeeklyCalendar/>
        </View>


        <View style={styles.caption}>

            <Image 
                source={require("../../../assets/img/Fire.png")}
                style={{paddingHorizontal:10}}
            />

            <Text style={{...styles.semitext, fontSize:14}}>
             You're on <Text style={{color:'#2B4752', fontFamily:'NunitoBold'}}>Day 2</Text> of growing your faith confidence!
        </Text>

        </View>
        

            <Image
                source={require("../../../assets/img/rooted.png")}
                style={styles.img}
            
            />


            <Text style={styles.semitext}>Your faith journey is worth showing up for - every day and every week</Text>
       



      </View>

      <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"Notification"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', padding: 10, paddingBottom:55},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingVertical: 40, paddingHorizontal: 20},
  subtitle: {fontFamily:'NunitoBold', fontSize: 25, color: deepGreen},
  text: {fontFamily:'NunitoBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap'},
  semitext: {color:'#90B2B2', fontFamily:'NunitoRegular', fontSize:16, textAlign:'center', flexWrap:'wrap', },
  img: {width:'100%',height: 200,objectFit:'contain'},
  caption: {display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center'}


})