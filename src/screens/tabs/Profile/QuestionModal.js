import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native'
import CommonButton from '../../../components/CommonButton'
import { deepGreen, primaryText } from '../../../components/Constant'
import { useNavigation } from '@react-navigation/native'
import CustomModal from '../../../components/CustomModal'
import ProgressBar from '../../../components/ProgressBar'
import FaithQuestionSlider from '../../../components/FaithQuestionSlider'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const questions = {
    1:{
        question: `This week, how confident did you feel sharing your faith with others?`,
        options: {
            1:`Not at all`,
            2: `Hesitant`,
            3: `Growing in boldness`,
            4: `Mostly confident`,
            5: `Completely confident`
        },
        ans: 1
    },
    2:{
        question: `When conversations about faith came up, how prepared did you feel to respond? `,
        options: {
            1:`Not prepared at all`,
            2: `Caught off guard`,
            3: `Finding my footing`,
            4: `Mostly prepared`,
            5: `Fully prepared`
        },
        ans: 1
    },
    3:{
        question: `How clearly did scripture speak to you this week? `,
        options: {
            1:`Not clear at all`,
            2: `A bit cloudy`,
            3: `Starting to make sense`,
            4: `Mostly clear`,
            5: `Crystal clear`
        },
        ans: 1
    },
    4:{
        question: ` When reflecting on your relationship with God, how much peace did you feel? `,
        options: {
            1:`Restless`,
            2: `Wrestling with it`,
            3: `Finding moments of peace`,
            4: `Mostly at peace`,
            5: `Completely at peace`
        },
        ans: 1
    },
    5:{
        question: `How often did you create space to pray, reflect, or listen for God’s voice? `,
        options: {
            1:`Not at all`,
            2: `Rarely, but I want to more`,
            3: `Somewhat consistent`,
            4: `Often`,
            5: `Every day`
        },
        ans: 1
    },
    6:{
        question: `How present did God feel in your daily life this week?`,
        options: {
            1:`Distant`,
            2: `There in moments`,
            3: `Becoming more aware`,
            4: `Mostly present`,
            5: `Very near`
        },
        ans: 1
    },
    7:{
        question: `How confident do you feel about the direction of your faith journey?`,
        options: {
            1:`Uncertain`,
            2: `Taking small steps`,
            3: `Finding my rhythm`,
            4: `Mostly confident`,
            5: `Very confident`
        },
        ans: 1
    },
    8:{
        question: `Looking back on this week, how much growth do you see in your faith? `,
        options: {
            1:`None at all`,
            2: `A little, but I want more`,
            3: `Some noticeable growth`,
            4: `A lot of growth`,
            5: `Tremendous growth`
        },
        ans: 1
    },
    9:{
        question: `. How often did you feel uplifted and encouraged in your walk with God this week?`,
        options: {
            1:`Not at all`,
            2: `Needed more encouragement`,
            3: `Had some encouraging moments`,
            4: `Often`,
            5: `Constantly`
        },
        ans: 1
    },
    10:{
        question: `How motivated are you to continue deepening your faith in the coming week?`,
        options: {
            1:`Not at all`,
            2: `A little spark of motivation`,
            3: `Starting to feel inspired `,
            4: `Mostly motivated`,
            5: `Fully motivated`
        },
        ans: 1
    },
}



const QuestionModal = ({modalVisible, setModalVisible, navigation}) => {


    const [allQuestions, setAllQuestions] = useState(questions)
    const [ans, setAns] = useState("")
    const [currentQuestion, setCurrentQuestion]=useState({
        question: ``,
        options: {
            1: ``,
            2: ``,
            3: ``,
            4: ``,
            5: ``
        },
        ans: 1
    })
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1)

    useEffect(()=>{
        setAllQuestions(questions)
        setCurrentQuestion(questions[currentQuestionIndex])
        setAns(questions[currentQuestion]?.options[currentQuestionIndex])
    },[])


    const handleNext = () =>{
        if(currentQuestionIndex<10){
            setCurrentQuestionIndex(currentQuestionIndex+1)
            setCurrentQuestion(allQuestions[currentQuestionIndex+1])
        }else{
            setModalVisible(false),
            navigation.navigate("PorfileFaith")
        }
    }

    // console.log(currentQuestion)

    return <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        animationType='slide'
        overlayStyle={{backgroundColor:'#fff', flex:1, paddingTop:0}}
        modalContainerStyle={{
            elevation: 0,
            backgroundColor:"#fff",
            width: "110%",
            height:window.height,
            flex:1,
            paddingVertical:0
        }}
        title={() => <Text style={{fontFamily:'NunitoBold'}}>{currentQuestionIndex}/10</Text>}
        headerStyle={{paddingHorizontal:20, paddingVertical:10}}
    >
        <View style={{paddingVertical:20,paddingHorizontal:20}}>
            <ProgressBar progress={currentQuestionIndex*10}/>
        </View>
        <View style={{
            // maxHeight: hp("20%"),
            // backgroundColor:'red',
            // flexWrap:'wrap'
        }}>
            <Text style={{
                fontFamily:'NunitoBold',
                fontSize: 18,
                textAlign:'center',
                padding: 30,
                flexWrap:'wrap'
            }}>{currentQuestion?.question}</Text>
        </View>
        
        <FaithQuestionSlider
            Answers={currentQuestion.options}
            selectedOption={currentQuestion.ans}
            ans={ans}
            setAns={a=> setAns(a)}
        />
        
        <Text style={{paddingHorizontal:60, paddingBottom:30,color:'#80ADAA', fontFamily:'NunitoSemiBold', fontSize:16, textAlign:'center'}}>
            Drag the slider left or right to change the answer
        </Text>

        <View style={{paddingHorizontal:20, paddingBottom:0}}>
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

    </CustomModal>

}


export default QuestionModal