import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import CommonButton from '../../../components/CommonButton';
import { deepGreen, primaryText } from '../../../components/Constant';
import { useNavigation } from '@react-navigation/native';

const Feedback = ({visible, onClose, feedback, setFeedback}) => {

    const {navigation} = useNavigation()


  return (
    <CustomModal
        visible={visible}
        onClose={onClose}
        headerStyle={{
            paddingHorizontal: 10
        }}
    >
        <View style={{
            paddingHorizontal: 20
        }}>
            <Text style={styles.title}>
                Was this chat helpful?
            </Text>

        
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Image
                    source={require("../../../../assets/img/ThumbsUp.png")}
                    style={styles.star}
                />
                
                <Image
                    source={require("../../../../assets/img/ThumbsDown.png")}
                    style={[styles.star,{marginRight:0}]}
                />
            </View>

            <View style={{paddingBottom:20}}>
                <CommonButton
                    btnText={"Submit"}
                    bgColor={deepGreen}
                    navigation={navigation}
                    route={""}
                    txtColor={primaryText}
                    bold='bold'
                    handler={() => setFeedback("like")}
                    opacity={0.7}
                />
            </View>
        </View>
    </CustomModal>
  )
}

export default Feedback

const styles = StyleSheet.create({
    star:{
        height:40,
        width:40,
        objectFit:'contain',
        marginRight:20,
        marginVertical: 30
    },
    title: {
        fontFamily:"DMSerifDisplay",
        fontSize:30,
        color:'#0B172A',
        marginBottom: 0,
        textAlign:'center'
    },
    subtitle:{
        color:'#3F5862',
        fontFamily:'NunitoSemiBold',
        fontSize:16,
        textAlign:'center'
    },

})
