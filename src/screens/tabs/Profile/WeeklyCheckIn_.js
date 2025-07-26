import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Indicator from '../../../components/Indicator';
import { get_week_details_by_id } from '../TabsAPI';
import { useRoute } from '@react-navigation/native';
import { set } from 'date-fns';


const WeeklyCheckIn_ = () => {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const route = useRoute();

    const handleGetDetails = () =>{
        setLoading(true);
        get_week_details_by_id(route.params.week_number, (res, success) => {
            setLoading(false);
            if(success){
                setQuestions(res.data.responses);
            }else{
                console.log(res);
            }
        })
    }


    useState(() =>{
        handleGetDetails()
    }, [])


    const renderItem = ({item}) => {
        return <View style={styles.cardWrapper}>
            <View style={styles.cardContainer}>
                <View style={styles.cardSubContainer1}>
                    <Text style={styles.number}>{item.question.order}.</Text>
                </View>
                <View style={styles.cardSubContainer2}>
                    <Text style={styles.title}>{item.question.text}</Text>
                    <Text style={styles.text}>Your Answer: <Text style={{fontFamily:"NunitoBold"}}>{item.selected_option.text}</Text></Text>
                </View>
            </View>
        </View>
    }


  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>



        <FlatList
            data={questions} 
            keyExtractor={item => item.answered_at}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}

        />


    

        {loading && <Indicator visible={loading} onClose={()=>setLoading(false)}>
            <ActivityIndicator size={"large"}/>
        </Indicator>}
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
        width:"10%",
    },
    cardSubContainer2:{
        width:"90%"
    }
})