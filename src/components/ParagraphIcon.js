import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ParagraphIcon = ({icon, text, textStyle={}}) => {
  return (
    <View style={styles.container}>
        <Image 
        source={icon}
        style={styles.img}
        />
        <Text style={{...styles.text, ...textStyle}}>{text}</Text>
    </View>
  )
}

export default ParagraphIcon



const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
        paddingVertical:10,
    },
    img: {
        height:25,
        width:25,
        objectFit: 'contain',
        marginRight:12
    },
    text: {
        fontFamily:'NunitoBold',
        color:'#2B4752',
        fontSize: 16,
        flexWrap:'wrap',
        paddingRight: 30
    }
})