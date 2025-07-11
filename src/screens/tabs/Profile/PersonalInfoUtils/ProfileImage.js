import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { View, Image, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { handleToast } from '../../../auth/AuthAPI';

const ProfileImage = () => {

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status != 'granted'){
            handleToast("error", "Permission denied", 2000, ()=>{}, ()=>{});
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            quality:1
        })

        if(!result.canceled){
            setImage(result.assets[0]);
            console.log("image details ->", result)
        }

    }


    console.log(image)





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
            <Pressable 
                onPress={pickImage}
            style={{
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
            </Pressable>
    </View>
    </>
  )
}

export default ProfileImage
