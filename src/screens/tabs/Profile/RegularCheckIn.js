import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, Dimensions} from 'react-native'
import CommonButton from '../../../components/CommonButton'
import { deepGreen, primaryText } from '../../../components/Constant'
import { useNavigation } from '@react-navigation/native'
import CustomModal from '../../../components/CustomModal'
import ProgressBar from '../../../components/ProgressBar'
import FaithQuestionSlider from '../../../components/FaithQuestionSlider'

const window = Dimensions.get("window")

const RegularCheckIn = ({navigation, route}) => {

    const {title} = route.params
    const [modalVisible, setModalVisible] = useState(false);
    // const navigation = useNavigation()

    useEffect(()=>{
        navigation.setOptions({title})
    }, [navigation, title]);

    const handleNext = () =>{
        setModalVisible(false),
        navigation.navigate("PorfileFaith")
    }

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

        { <CustomModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            animationType='slide'
            overlayStyle={{backgroundColor:'red'}}
            modalContainerStyle={{
                elevation: 0,
                backgroundColor:"green",
                width: "110%",
                height:window.height
            }}
            title={() => <Text style={{width:'90%', textAlign:'center', fontWeight:'bold',}}>1/10</Text>}
            headerStyle={{paddingHorizontal:20}}
        >
            <View style={{paddingVertical:20,paddingHorizontal:20}}>
                <ProgressBar progress={20}/>
            </View>
            <View>
                <Text style={{
                    fontFamily:'NunitoBold',
                    fontSize: 18,
                    textAlign:'center',
                    padding: 30
                }}>How confident do you feel about the direction of your faith journey?</Text>
            </View>
            
            <FaithQuestionSlider/>
            
            <Text style={{paddingHorizontal:60, paddingVertical:30,color:'#80ADAA', fontFamily:'NunitoSemiBold', fontSize:16, textAlign:'center'}}>
                Drag the slider left or right to change the answer
            </Text>

            <View style={{paddingHorizontal:20, paddingVertical:30}}>
                <CommonButton
                    btnText={"Next"}
                    bgColor={deepGreen}
                    navigation={navigation}
                    route={""}
                    txtColor={primaryText}
                    bold='bold'
                    handler={() => handleNext()}
                    opacity={1}
                />
            </View>

        </CustomModal>}


    </View>
  )
}

export default RegularCheckIn
const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#fff', alignItems:'center',  paddingHorizontal:0, paddingVertical:40},
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