import React, { useEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native'
import CommonButton from '../../../components/CommonButton'
import { deepGreen, primaryText } from '../../../components/Constant'
import { useNavigation } from '@react-navigation/native'
const RegularCheckIn = ({navigation, route}) => {

    const {title} = route.params

    // const navigation = useNavigation()

    useEffect(()=>{
        navigation.setOptions({title})
    }, [navigation, title]);

  return (
    <SafeAreaView style={styles.container}>
        <Image 
            source={require("../../../../assets/img/create_weekly_check_in.png")}
            style={{
                height:250,
                width: 200,
                objectFit:'contain',
                backgroundColor:'#fff'
            }}
        />

        <Text style={styles.title}>Time for a heart check!</Text>
        <Text style={styles.text}>Take a moment to reflect on your faith journey this week. Your growth, clarity, and connection matter—this isn’t just a habit, it’s a step toward a more powerful, confident faith</Text>
        
        <CommonButton
            btnText={"Start Check-In"}
            bgColor={deepGreen}
            navigation={navigation}
            route={"QuestionScreen"}//QuestionScreen,PorfileFaith
            txtColor={primaryText}
            bold='bold'
            opacity={1}
        />


    </SafeAreaView>
  )
}

export default RegularCheckIn
const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#fff', alignItems:'center', paddingVertical: 50, paddingHorizontal:20},
    title:{
        fontFamily:'DMSerifDisplay',
        fontSize:32,
        color:'#0B172A',
        paddingVertical:40
    },
    text:{
        fontFamily:'NunitoSemiBold',
        fontSize: 17,
        color:'#2B4752',
        textAlign:'center',
        paddingBottom: 50
    }
})