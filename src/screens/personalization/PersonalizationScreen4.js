import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ImageBackground, ActivityIndicator} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import useLayoutDimention from '../../hooks/useLayoutDimention';
import { getStyles } from './PersonalizationScreen4Style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';
import Indicator from '../../components/Indicator';
import { bible_familiarity} from './PersonalizationAPIs';
const data = [
  {
    title: "None",
    id: 1,
    text1:"New to the Word? No problem!",
    text2:"",
    title:"Simplified Responses",
    caption:"Preachly will break things down in an easy-to-understand way, offering clear, simple explanations to help you build a strong foundation."
  },
  { 
    title: "A Little",
    id: 2,
    text1:"A great foundation! Let's go deeper",
    text2:"You have some knowledge, and we'll build on it!",
    title:"In-Depth Responses",
    caption:"Preachly's answers will include context connections, and deeper insights to enrich your understanding"
  },
  {
    title: "A Lot",
    id: 3,
    text1:"Ready for the deep dive?",
    text2:"",
    title:"Multi-Argumentation Responses",
    caption:"Preachly will provide multi-layered explanations, exploring different perspectives, theological arguments, and scriptural connections to help you sharpen your understanding"
  }
]

export default function PersonalizationScreen() {

  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)
  const [isLoading, setIsLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const navigation = useNavigation();
  const handleSubmit = () => {
    const payload = {
      "bible_familiarity_option": index+1
    };
    setIsLoading(true);
    bible_familiarity(payload, (response, success) => {
      setIsLoading(false);
      if (success) {
        navigation.navigate("Personalization5");
      } else {
        console.error("Error submitting bible familiarity:", response);
      }
    })
  }


  return (
    <View style={styles.container}>
      
      <View>
        <View style={{}}>
          <ProgressBar progress={14.28*5} />
        </View>

        <Text style={styles.title}>How familiar are you with the Bible</Text>


        <View style={styles.imageContainer}>

            <PhotoCard 
              isActive={index==0}
              setIsActive={() => setIndex(0)}
              text={"None"}
              img={require("../../../assets/img/card_bg1.png")}
            />
            <PhotoCard 
              isActive={index==1}
              setIsActive={() => setIndex(1)}
              text={"A Little"}
              img={require("../../../assets/img/card_bg2.png")}
            />
            <PhotoCard 
              isActive={index==2}
              setIsActive={() => setIndex(2)}
              text={"A Lot"}
              img={require("../../../assets/img/card_bg3.png")}
            />
          
        </View>

        
        <Content
          styles={styles}
          data={data[index]}
        />
        



      </View>

      <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={""}
          handler={handleSubmit}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
      {isLoading && <Indicator visible={isLoading} onClose={() => setIsLoading(false)}  ><ActivityIndicator size="large" /></Indicator>}
    </View>
  );
}



const Content = ({styles, data}) => {
  return <View>
          <View style={styles.textContainer}>
              <Text style={styles.text}>{data?.text1}</Text>
              <View style={{height:15}}></View>
              {data?.text2 && <Text style={styles.text}>{data?.text2}</Text>}
          </View>

          <View style={{alignItems:'center'}}>
              <Text style={styles.subtitle}>{data?.title}</Text>

              <Text style={styles.semitext}>{data?.caption}</Text>
          </View>
    </View>
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
                fontFamily:"NunitoExtraBold",
                textAlign:'center',
                fontSize:hp("2%")
              }}>{text}</Text>
            </ImageBackground>
          </View>
      </Pressable>
}

const styles = StyleSheet.create({
  img: { 
    height:hp("12%"),
    width: wp("27%"), 
    objectFit:'contain', 
    padding:15,
    justifyContent:'center',
    alignItems:"center"
  },
  imgWrapper:{
    height:hp("12%"),
    width: wp("27%"), 
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

})