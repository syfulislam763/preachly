import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import WeeklyCalendar from '../../components/WeeklyCalendar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useLayoutDimention from '../../hooks/useLayoutDimention';
import { getStyles } from './PersonalizationScreen6Style';

export default function PersonalizationScreen({navigation}) {

  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)

  return (
    <View style={styles.container}>
      
      <View>

        
        <ProgressBar progress={100} />


        <Text style={styles.title}>Your Daily Dose of Clarity, and Inspired Confidence</Text>


        <View style={styles.textContainer}>
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
