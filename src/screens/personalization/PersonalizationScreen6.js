import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import WeeklyCalendar from '../../components/WeeklyCalendar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default function PersonalizationScreen({navigation}) {


  return (
    <View style={styles.container}>
      
      <View>

        
        <ProgressBar progress={100} />


        <Text style={styles.title}>Your Daily Dose of Clarity, and Inspired Confidence</Text>


        <View style={{paddingBottom:30}}>
            <Text style={styles.text}>Each day you show up strengthen</Text>
            <Text style={styles.text}> your spiritual foundation. Build your streak, </Text>
            <Text style={styles.text}>check in weekly, and unlock badges that </Text>
            <Text style={styles.text}>reflect your growth</Text>
         
        </View>


        <View style={{paddingTop:hp("1%")}}>
            <WeeklyCalendar/>
        </View>


        <View style={styles.caption}>

            <Image 
                source={require("../../../assets/img/Fire.png")}
                style={{}}
            />

            <Text style={{...styles.semitext, fontSize:14,}}>
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
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', padding: 10, paddingBottom:hp('2%')},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingVertical: 40, paddingHorizontal: 10, lineHeight:35, color:'#0B172A'},
  subtitle: {fontFamily:'NunitoSemiBold', fontSize: 20, color: deepGreen},
  text: {fontFamily:'NunitoSemiBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap'},
  semitext: {color:'#90B2B2', fontFamily:'NunitoRegular', fontSize:14.5, textAlign:'center', flexWrap:'wrap', marginLeft:wp("1%") },
  img: {width:'100%',height: 180,objectFit:'contain'},
  caption: {display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center', marginTop:hp("1%")}


})