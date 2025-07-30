import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Dimensions} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import FooterBar from '../../../components/FooterBar';
import CommonButton from '../../../components/CommonButton';
import Divider from '../../../components/Divider'
import PlanSelector from '../../../components/SubscriptionPlan';
import CustomHeader from '../../../components/CustomNavigation';
import ParagraphIcon from '../../../components/ParagraphIcon';

import {
  presentGooglePay,
  isGooglePaySupported,
  initGooglePay,
} from '@stripe/stripe-react-native';

const window = Dimensions.get("window")

export default function ProfileSubscription({ navigation }) {
  const { login } = useAuth();


  const initialize = async () => {
      const isSupported = await isGooglePaySupported();
      if (!isSupported) {
        console.log('Google Pay not supported on this device');
        return;
      }

      const { error } = await initGooglePay({
        testEnv: true,
        merchantName: 'My Test Merchant',
        countryCode: 'US',
        billingAddressConfig: {
          isRequired: false,
          format: 'MIN',
          isPhoneNumberRequired: false,
        },
        existingPaymentMethodRequired: false,
      });

      if (error) {
        console.log('Init Error', error.message);
      }
    };


  useEffect(() => {
    console.log("init")
    initialize();
  }, [])


  const payWithGooglePay = async () => {
    try {
      // const response = await fetch('http://192.168.0.101:8000/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: 1000, currency: 'usd' }),
      // });
      // const { clientSecret } = await response.json();
      const clientSecret = "pi_3NF9w3S9d2ABC123_secret_G2m8X45Y9zz9jHkV7gkJGKkPj"

      const result = await presentGooglePay({ clientSecret });

      if (result.error) {
        console.log('Error', result.error.message);
      } else {
        console.log('Success', 'Payment completed!');
      }
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  

  return (
    <View style={{ flex:1, backgroundColor:'#fff', justifyContent:'space-between'}}>
         


        <View style={styles.content}>
            
            <Text style={{
                fontFamily:'DMSerifDisplay',
                fontSize: 28,
                color:'#0B172A',
                paddingBottom: 25
            }}>Your Plan</Text>

            <ParagraphIcon
              icon={require("../../../../assets/img/24-sunset.png")}
              text={"Build Confidence in Conversations About Faith"}
              textStyle={{fontFamily:'NunitoSemiBold'}}
            />
            <ParagraphIcon
              icon={require("../../../../assets/img/bird.png")}
              text={"Clarity and Ease When You Need It Most"}
              textStyle={{fontFamily:'NunitoSemiBold'}}
            />
            <ParagraphIcon
              icon={require("../../../../assets/img/piramid.png")}
              text={"Inspire and Strengthen Your Walk with God"}
              textStyle={{fontFamily:'NunitoSemiBold'}}
            />

            <View style={{height:20}}></View>

            <PlanSelector
                OtherPlan={() => <Text style={{
                    fontSize:20,
                    color: '#0000000',
                    fontWeight:'500',
                    paddingBottom: 15
                    }}>Other Plans</Text>
                }
            />

            <View style={{height:30}}></View>

        </View>

        <View style={{
            padding:20
        }}>
            <CommonButton
                btnText={"Manage subscription"}
                bgColor={"#005A55"}
                navigation={navigation}
                route={""}//"SubscriptionConfirmedScreen"
                handler={() => payWithGooglePay()}
                txtColor={"#fff"}
                opacity={1}
            />
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
    height: (window.height*40)/100,
    width:'100%'
  },
  content: {
    width:"100%",
    backgroundColor:'#fff',
    
    // justifyContent: 'center',
    // alignItems: 'center',
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

