import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


export default function PersonalizationScreen({navigation}) {

  const [cardOne, setCardOne] = useState(true)
  const [cardTwo, setCardTwo] = useState(false)


  const handleIsActive = () => {
    setCardOne(!cardOne)
    setCardTwo(!cardTwo)
  }


  return (
    <SafeAreaView style={styles.container}>
      
      <View>
        <View style={{marginTop:"10%"}}>
          <ProgressBar progress={14.28} />
        </View>

        <Text style={styles.title}>Your Journey Matters. Let's discover how Preachly can empower your faith</Text>

        <Text style={styles.text}>When it comes to your faith, what do you need most right now?</Text>


        <View style={styles.imageContainer}>
            <PhotoCard
              isActive={cardOne}
              setIsActive={handleIsActive}
              img={require("../../../assets/img/card_bg1.png")}
              text={"Clarity to overcome doubts"}
            />
            <PhotoCard
              isActive={cardTwo}
              setIsActive={handleIsActive}
              img={require("../../../assets/img/card_bg2.png")}
              text={"Confidence to share my beliefs"}
            />
            
        </View>
      </View>

      <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"Personalization1"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
    </SafeAreaView>
  );
}


const PhotoCard = ({isActive, setIsActive, img, text}) => {

  return <Pressable onPress={setIsActive} style={
    isActive?styles.imgWrap:{...styles.imgWrap, borderWidth:0}
  }>
          <View style={isActive?styles.imgWrapper:{...styles.imgWrapper, opacity:0.5}}>
            <ImageBackground
              source={img}
              style={styles.img}
            >
              <Text style={{
                flexWrap:'wrap',
                fontFamily:"NunitoSemiBold",
                textAlign:'center',
                fontSize:hp("2%")
              }}>{text}</Text>
            </ImageBackground>
          </View>
      </Pressable>
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', padding: 20, paddingBottom:27},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingTop: 40, paddingBottom: 30,color:'#0B172A', lineHeight: 35},
  text: {fontFamily:'NunitoBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap', paddingBottom: 50},
  img: { 
    height:hp("12%"),
    width: wp("42%"), 
    objectFit:'contain', 
    padding:15,
    justifyContent:'center',
    alignItems:"center"
  },
  imgWrapper:{
    height:hp("12%"),
    width: wp("42%"), 
    objectFit:'contain', 
    borderRadius:hp("1.5%"),
    backgroundColor:'#fff',
    opacity:1,
    overflow:'hidden'
  },
  imgWrap:{
    backgroundColor: "#fff",
    padding:5,
    borderWidth:2,
    borderColor:"#bda58a",
    borderRadius:hp("2%"),
    boxSizing:'border-box',
    overflow:"hidden"
  },
  imageContainer: {display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor: '#fff', }

})