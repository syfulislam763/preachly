import React, { useCallback, useLayoutEffect, useState } from 'react'
import {View, Text, Image, StyleSheet, Pressable, ActivityIndicator, ImageBackground, TouchableWithoutFeedback, FlatList} from 'react-native'
import CommonButton from '../../../components/CommonButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deepGreen, primaryText } from '../../../components/Constant'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const img1 = require('../../../../assets/img/card_bg9.png');
const img2 = require('../../../../assets/img/card_bg10.png');
import { get_all_goals } from '../TabsAPI'
import Indicator from '../../../components/Indicator'


const CurrentGoals = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [currentWeek, setCurrentWeek] = useState({});
    const [history, setHistory] = useState([]);
    const [week, setWeek] = useState(100)



    const renderItem = ({item, isCurrent = false}) => {
        const week_end = (item?.week_end)?timeAgo(item?.week_end):"";
        const week_start = (item?.week_start)?timeAgo(item?.week_start):""
        const current = isCurrent?"(running)":"(ended)";
        const goals = (item?.goals)?item?.goals:[]
        // const week_end = "";
        // const week_start = "";
  
        return <Pressable style={{
            backgroundColor:'#ffffff'
        }} onPress={() => {
            
        }}>
            <Text style={{
                fontFamily:"NunitoSemiBold",
                fontSize:15,
                color:"#0B172A",
                paddingLeft: 5,
                marginBottom:10
            }}>{`${week_start} - ${week_end} ${current}`}{" "}</Text>
            
            {goals[0] && <Card 
                index={0}
                progress={`${goals[0].progress_percentage}%`}
                title={goals[0].goal_display}
                text={`${goals[0].current_count}/${goals[0].target_count} completed`}
            />}
            {goals[1] && <Card 
                index={1}
                progress={`${goals[1].progress_percentage}%`}
                title={goals[1].goal_display}
                text={`${goals[1].current_count}/${goals[1].target_count} completed`}
            />}
            {goals[2] && <Card 
                index={2}
                progress={`${goals[2].progress_percentage}%`}
                title={goals[2].goal_display}
                text={`${goals[2].current_count}/${goals[2].target_count} completed`}
            />}
           
        </Pressable>
    }

    const timeAgo = (string) => {
        if(string == ""){
            return " "
        }
        const month_string = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const now = new Date(string);
   
        const day = now.getUTCDate();
        const month = month_string[now.getUTCMonth()];
        const year = now.getUTCFullYear();
        return `${day} ${month} ${year}`
    }

    const handle_get_all_goals = () =>{
        setLoading(true);
        const week = 12
        get_all_goals(week, (res, success) => {
            setLoading(false);
            if(success){
                const temp = res?.data?.weeks;
                const current_week = temp.filter(item => item?.is_current_week);
                const history = temp.filter(item => !(item.is_current_week))
                setCurrentWeek(current_week[0]);
                setHistory(history)
                console.log("...", JSON.stringify(current_week[0], null, 2))
            }else{
                console.log(res);
            }
        })
    }


    useFocusEffect(
        useCallback(() => {
            handle_get_all_goals()
        }, [])
    )


  return (
        <SafeAreaView style={styles.container} >
            <View style={styles.subContainer}>

                
                <FlatList 
                    ListHeaderComponent={() => {
                        return renderItem({item: currentWeek, isCurrent:true})
                    }}
                    data={[]}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    // stickyHeaderIndices={[0]}
                />


                {/* <View>
                    <CommonButton
                        btnText={"Homepage"}
                        bgColor={deepGreen}
                        navigation={navigation}
                        route={""}
                        txtColor={primaryText}
                        bold='bold'
                        opacity={1}
                    />
                </View> */}
            </View>
            {loading && <Indicator visible={loading} onClose={() =>setLoading(false)}>
                <ActivityIndicator size={"large"}/>
            </Indicator>}
        </SafeAreaView>
  )
}



const Card = ({img, index = 0, title, text, progress}) => {

    return <ImageBackground
                    source={(index==1)?img2:img1}  // or use { uri: 'https://...' }
                    style={styles.background}
                    resizeMode="cover"
                >
                    <View style={{
                        padding:15,
                    }}>
                        <Text style={(index==1)?{...styles.title, color:"#ffffff"}:{...styles.title}}>{title || "Memorize 5 Scriptures"}</Text>
                        <View style={styles.card_wrap}>
                            <Text 
                                style={(index==1)?{...styles.text, color:"#ffffff99"}:{...styles.text}}
                            >
                                {text || "3/5 completed"}
                            </Text>

                            <View style={{
                                width:"40%"
                            }}>
                                <View style={[(index ==1)?{...styles.progressContainer,backgroundColor:"#ffffff99"}:styles.progressContainer]}>
                                    <View style={[(index ==1)?{...styles.innerBar, backgroundColor:"#ffffff", width:progress || "40%"}:{...styles.innerBar, width:progress || "40%"}]}></View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
}

export default CurrentGoals


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
    },
    subContainer:{
        height:"100%",
        paddingHorizontal:20,
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    
    background:{
        height:82,
        width:'100%',
        flexDirection:'column',
        justifyContent:"center",
        marginBottom:15,
        overflow:'hidden',
        borderRadius: 15,
    },

    card_wrap:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    title:{
        fontFamily:"NunitoSemiBold",
        fontSize: 15,
        marginBottom: 7,
        color:"#0B172A"
    },
    text:{
        marginRight:"5%",
        fontFamily:"NunitoSemiBold",
        fontSize: 12,
        color:"#53381E"
    },
    progressContainer:{
        height:4,
        width:"100%",
        backgroundColor:"#53381E33",
        overflow:"hidden",
        borderRadius: 5,
    },
    innerBar:{
        height:4,
        width: "30%", 
        backgroundColor:"#53381E",
        borderRadius:5
    }
})
