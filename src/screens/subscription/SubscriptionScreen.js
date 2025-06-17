import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Dimensions} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import FooterBar from '../../components/FooterBar';
import CommonButton from '../../components/CommonButton';
import Divider from '../../components/Divider'
import PlanSelector from '../../components/SubscriptionPlan';
import CustomHeader from '../../components/CustomNavigation';
import ParagraphIcon from '../../components/ParagraphIcon';


const window = Dimensions.get("window")

export default function SubscriptionScreen({ navigation }) {
  const { login } = useAuth();
  

  return (
    <View style={{position:'relative', flex:1, backgroundColor:'#fff'}}>
         
          
         <ImageBackground
            source={require('../../../assets/img/bg_large2.png')}
            style={styles.background}
            resizeMode="cover" 
        >
            <Text style={{
              fontFamily:'DMSerifDisplay',
              fontSize:32,
              paddingHorizontal:32,
              paddingTop:10,
              lineHeight:35,
              color:'#0B172A',
              textAlign:'center'
            }}>Inspired Answers, When You're Lost for Words</Text>
        </ImageBackground>


        <View style={styles.content}>

            <ParagraphIcon
              icon={require("../../../assets/img/24-sunset.png")}
              text={"Build Confidence in Conversations About Faith"}
            />
            <ParagraphIcon
              icon={require("../../../assets/img/bird.png")}
              text={"Clarity and Ease When You Need It Most"}
            />
            <ParagraphIcon
              icon={require("../../../assets/img/piramid.png")}
              text={"Inspire and Strengthen Your Walk with God"}
            />

            <View style={{height:20}}></View>

            <PlanSelector/>

            <View style={{height:30}}></View>

            <CommonButton
                btnText={"Try Free & Subscribe"}
                bgColor={"#005A55"}
                navigation={navigation}
                route={"SubscriptionConfirmedScreen"}
                txtColor={"#fff"}
                opacity={1}
            />

            <Text style={styles.footerText}>Cancel anytime. Subscription auto-renews.By subscribing, you agree to <Text style={styles.footerHighlighter}>Privacy Policy</Text> </Text>


        </View>


    </View>
  );
}


const styles = StyleSheet.create({
  footerHighlighter:{color:'black', textDecorationLine:'underline', fontFamily: 'NunitoExtraBold'},

  footerText:{fontSize:16, color:'#90B2B2', paddingHorizontal: 16, paddingVertical:20, textAlign:'center', fontFamily:'NunitoSemiBold'},

  googleAppleAuth:{
      display:"flex",
      flexDirection:"row",
      width: "30%",
      justifyContent:'space-between',
      padding: 40,
      boxSizing:'content-box'
  },
  background: {
    height: window.height*0.28,
    width:'100%'
  },
  content: {
    width:"100%",
    backgroundColor:'#fff',
    position:'absolute',
    top: window.height*0.22,
    left:0,
    right:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding:20,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  title:{
    textAlign:'center',
    fontSize: 32,
    padding:30,
    fontFamily: 'DMSerifDisplay'
  },
  subtitle:{
    fontSize:16,
    paddingBottom: 50,
    fontFamily: 'NunitoSemiBold'
  }
});