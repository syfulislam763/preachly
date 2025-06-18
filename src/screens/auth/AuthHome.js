import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Dimensions} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import FooterBar from '../../components/FooterBar';
import CommonButton from '../../components/CommonButton';
import Divider from '../../components/Divider';
import { getStyles } from './AuthHomeStyle';
import useLayoutDimention from '../../hooks/useLayoutDimention';





export default function AuthHome({ navigation }) {
  const { login } = useAuth();
  const {isLarge, isMedium, isSmall} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge)
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

            <View style={styles.divider}>
              <Divider text={"or"}/>
            </View>

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