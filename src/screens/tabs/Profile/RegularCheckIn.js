import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native'
import CommonButton from '../../../components/CommonButton'
import { deepGreen, primaryText } from '../../../components/Constant'
import { useNavigation } from '@react-navigation/native'
import CustomModal from '../../../components/CustomModal'
import ProgressBar from '../../../components/ProgressBar'
import FaithQuestionSlider from '../../../components/FaithQuestionSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import QuestionModal from './QuestionModal'


const window = Dimensions.get("window")

const RegularCheckIn = ({navigation, route}) => {

    const {title} = route.params
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        navigation.setOptions({title})
    }, [navigation, title]);

  return (
    <View style={styles.container}>
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
            route={""}
            txtColor={primaryText}
            bold='bold'
            handler={() => setModalVisible(true)}
            opacity={1}
        />

        {modalVisible&& <QuestionModal
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible(false)}
            navigation={navigation}
        />}
    </View>
  )
}

export default RegularCheckIn
const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#fff', alignItems:'center',  paddingHorizontal:20, paddingVertical:40},
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