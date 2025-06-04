import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const WeeklyCheckIn_ = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
        <View style={styles.cardWrapper}>
            <View style={styles.cardContainer}>
                <View style={styles.cardSubContainer1}>
                    <Text style={styles.number}>1.</Text>
                </View>
                <View style={styles.cardSubContainer2}>
                    <Text style={styles.title}>This week, how confident did you feel sharing your faith with others?</Text>
                    <Text style={styles.text}>Your Answer: <Text style={{fontFamily:"NunitoBold"}}>Growing in bold ness</Text></Text>
                </View>
            </View>
        </View>



        <View style={styles.cardWrapper}>
            <View style={styles.cardContainer}>
                <View style={styles.cardSubContainer1}>
                    <Text style={styles.number}>2.</Text>
                </View>
                <View style={styles.cardSubContainer2}>
                    <Text style={styles.title}>This week, how confident did you feel sharing your faith with others?</Text>
                    <Text style={styles.text}>Your Answer: <Text style={{fontFamily:"NunitoBold"}}>Growing in bold ness</Text></Text>
                </View>
            </View>
        </View>


        <View style={styles.cardWrapper}>
            <View style={styles.cardContainer}>
                <View style={styles.cardSubContainer1}>
                    <Text style={styles.number}>3.</Text>
                </View>
                <View style={styles.cardSubContainer2}>
                    <Text style={styles.title}>This week, how confident did you feel sharing your faith with others?</Text>
                    <Text style={styles.text}>Your Answer: <Text style={{fontFamily:"NunitoBold"}}>Growing in bold ness</Text></Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default WeeklyCheckIn_


const styles = StyleSheet.create({
    cardWrapper:{
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    cardContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        padding:20
    },
    title:{
        color:'#0B172A',
        fontFamily:'NunitoBold',
        fontSize: 18,
    },
    text:{
        fontFamily:'NunitoSemiBold',
        fontSize:16,
        color:'#2B4752'
    },
    number:{
        fontFamily:'NunitoBold',
        fontSize: 18,
        color:'#966F44'
    },
    cardSubContainer1:{
        width:"5%",
    },
    cardSubContainer2:{
        width:"90%"
    }
})