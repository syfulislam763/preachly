import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { View, Image, Text } from 'react-native'

const ProfileImage = () => {
  return (
    <>
        <View style={{
            alignItems:'center',
            paddingVertical:hp("1%"),
            justifyContent:'center'
        }}>
            <Image 
                source={require("../../../../../assets/img/avatar.png")}
                style={{
                height:110,
                width:110,
                objectFit:'contain'
                }}
            />
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:hp("1%"),
                marginBottom: hp("1%"),
                justifyContent:'center',
            }}>
                <Text style={{
                fontFamily:'NunitoSemiBold',
                fontSize:16,
                color:'#996F44',
                marginRight:10
                }}>Change photo</Text>
                <Image
                source={require("../../../../../assets/img/PencilSimple.png")}
                style={{
                    height:16,
                    width:16,
                    objectFit: 'contain'
                }}
                />
            </View>
    </View>
    </>
  )
}

export default ProfileImage
