import React from 'react'
import {View, Text, Image, StyleSheet, Pressable} from 'react-native'
import CommonButton from '../../../components/CommonButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deepGreen, primaryText } from '../../../components/Constant'
import { useNavigation } from '@react-navigation/native'

const WeeklyCheckIn = () => {
    const navigation = useNavigation()
  return (
        <SafeAreaView style={styles.container} >
            <View style={styles.subContainer}>
                <View>
                    <Pressable 
                        onPress={() => navigation.navigate("RegularCheckIn", {title: "1 Weekly Check-In"})}
                    >
                        <Image
                            source={require("../../../../assets/img/bg_weekly_check_in.png")}
                            style={{
                                height: 150,
                                width:'100%',
                                objectFit:'contain'
                            }}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate("RegularCheckIn", {title: "2 Weekly Check-In"})}
                    >
                        <Image
                            source={require("../../../../assets/img/bg1_weekly_check_in.png")}
                            style={{
                                height: 100,
                                width:'100%',
                                objectFit:'contain'
                            }}
                        />
                    </Pressable>
                </View>

                <View>
                    {/* <CommonButton
                        btnText={"Homepage"}
                        bgColor={deepGreen}
                        navigation={navigation}
                        route={""}
                        txtColor={primaryText}
                        bold='bold'
                        opacity={1}
                    /> */}
                </View>
            </View>
        </SafeAreaView>
  )
}

export default WeeklyCheckIn


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
        paddingBottom: 100
    }
})
