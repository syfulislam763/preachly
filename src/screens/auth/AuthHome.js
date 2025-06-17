import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Dimensions} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import FooterBar from '../../components/FooterBar';
import CommonButton from '../../components/CommonButton';
import Divider from '../../components/Divider';



const window = Dimensions.get("window")

export default function AuthHome({ navigation }) {
  const { login } = useAuth();

  return (
    <View style={{position:'relative', flex:1, backgroundColor:'#fff'}}>
        

         <ImageBackground
            source={require('../../../assets/img/bg_img2.png')}
            style={styles.background}
            resizeMode="cover" 
        >
            
        </ImageBackground>


        <View style={styles.content}>
            <Text style={styles.title}>Inspired Answers are just a step away</Text>
            <Text style={styles.subtitle}>Equip your faith. Empower your words</Text>
            <CommonButton
                btnText={"Sign up"}
                bgColor={"#005A55"}
                navigation={navigation}
                route={"SignUp"}
                txtColor={"#fff"}
                opacity={1}
            />

            <View style={{height:10}}></View>
            <CommonButton
                btnText={"Log In"}
                bgColor={"#EDF3F3"}
                navigation={navigation}
                route={"SignIn"}
                txtColor={"#2B4752"}
                opacity={1}
            />

            <Divider text={"or"}/>

            <View style={styles.googleAppleAuth}>
                <Image 
                    source={require("../../../assets/img/appleAuth.png")}
                    height={50}
                    width={50}
                />
                <Image 
                    source={require("../../../assets/img/googleAuth.png")}
                    height={50}
                    width={50}
                />
            </View>
        
            <Text style={styles.footerText}>By singing up, you agree to the app's <Text style={styles.footerHighlighter}>Terms of Use</Text> and <Text style={styles.footerHighlighter}>Privacy Policy</Text></Text>


        </View>


    </View>
  );
}


const styles = StyleSheet.create({
  footerHighlighter:{color:'black', textDecorationLine:'underline', fontFamily: 'NunitoExtraBold'},

  footerText:{fontSize:16, color:'#90B2B2', paddingRight:50, paddingLeft:50, paddingTop:30, paddingBottom:30, textAlign:'center', fontFamily:'NunitoSemiBold'},

  googleAppleAuth:{
      display:"flex",
      flexDirection:"row",
      width: "30%",
      justifyContent:'space-between',
      padding: 40,
      boxSizing:'content-box'
  },
  background: {
    height: (window.height*40)/100,
    width:'100%'
  },
  content: {
    width:"100%",
    backgroundColor:'#fff',
    position:'absolute',
    top: (window.height*28)/100,
    left:0,
    right:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding:10,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  title:{
    textAlign:'center',
    fontSize: 36,
    padding:30,
    paddingHorizontal:20,
    fontFamily: 'DMSerifDisplay',
    color: '#0B172A',
    lineHeight:45
  },
  subtitle:{
    fontSize:18,
    paddingBottom: 50,
    fontFamily: 'NunitoSemiBold',
    color:"#2B4752"
  }
});