import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import CommonButton from '../../../components/CommonButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deepGreen, primaryText } from '../../../components/Constant'
import { useNavigation } from '@react-navigation/native'

const CurrentGoals = () => {
    const navigation = useNavigation()
  return (
        <SafeAreaView style={styles.container} >
            <View style={styles.subContainer}>
                <View>
                    <Image
                        source={require("../../../../assets/img/bg_goal.png")}
                        style={{
                            height: 100,
                            width:'100%',
                            objectFit:'contain'
                        }}
                    />
                    <Image
                        source={require("../../../../assets/img/bg1_goal.png")}
                        style={{
                            height: 100,
                            width:'100%',
                            objectFit:'contain'
                        }}
                    />
                </View>

                <View>
                    <CommonButton
                        btnText={"Homepage"}
                        bgColor={deepGreen}
                        navigation={navigation}
                        route={""}
                        txtColor={primaryText}
                        bold='bold'
                        opacity={1}
                    />
                </View>
            </View>
        </SafeAreaView>
  )
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
        paddingBottom: 100
    }
})
