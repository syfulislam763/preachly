import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deepGreen, lighgreen } from '../../components/Constant';
import OTPInput from '../../components/OTPInput';






const ConfirmationCode = ({ email = 'qwerty123@gmail.com', navigation }) => {
  const [code, setCode] = useState('');
  const handleOtpChange = (otp) => {
    console.log('OTP:', otp);
  };

  // Handle keypad press
  const handleKeyPress = (value) => {
    if (value === 11 && code.length > 0) {
      navigation.navigate("CreatePassword")
      console.log('Submitting code:', code);
    } else if (value === 10) {
      setCode(code.slice(0, -1));
    } else if (code.length < 4 && !isNaN(value)) {
      setCode(code + value);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      

      <View style={styles.subContainer}>

        <Text style={styles.title}>Enter confirmation Code</Text>

        <View style={{paddingTop:30, paddingBottom: 80}}>
          <Text style={styles.subtitle}>
          The 4-digit confirmation code has been sent to
          </Text>
          <Text style={styles.email}>{email}</Text>
        </View>
   
        {/* Code Input */}
        <OTPInput 
          length={4}
          onChange={(otp) => console.log('OTP changed:', otp)}
          onComplete={(otp) => navigation.navigate("CreatePassword")}
          error={false}
          focusColor="#005A55"
          errorColor="#B00020"
        />
        

        {/* Resend Link */}
        <View style={{height:20}}></View>
        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't get it? <Text style={styles.resendLink}>Resend code</Text>
          </Text>
        </TouchableOpacity>


      </View>



    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'space-between',
    backgroundColor:'#fff'
  },

  subContainer:{
    padding:20,
    paddingTop:50
  },
  title: {
    fontFamily:'DMSerifDisplay',
    fontSize:32,
    color:'#0B172A'
  },
  subtitle: {
    fontSize: 17,
    color: '#2B4752',
    textAlign: 'center',
    fontFamily:'NunitoSemiBold'
  },
  email: {
    fontSize: 17,
    fontFamily: 'NunitoSemiBold',
    color: '#2B4752',
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  codeDigit: {
    width: 50,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  codeText: {
    fontSize:  20,
  },
  underline: {
    height: 1,
    backgroundColor: lighgreen,
    width: '100%',
  },
  resendContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    color: lighgreen,
    fontFamily:'NunitoSemiBold'
  },
  resendLink: {
    color: '#005A55',
    fontWeight: 'bold',
    // textDecorationLine:'underline',
    // textDecorationColor:"red"
    
  },
  keypad: {
   display:'flex',
   flexDirection:'column',
   justifyContent:'space-between',
   backgroundColor:'#d0d4dc',
   gap:7,
   padding:10,
   paddingBottom: 100
  },
  keypadRow: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    gap:7
  },
  keypadKey: {
    height: 55,
    width: '32%',
    backgroundColor: '#fff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 7,
    borderBottomWidth: .8,
    borderBottomColor: '#000',
    backgroundColor: '#ffffff',

  },
  number:{
    fontSize:25,
    fontWeight:'bold',
  },
  abc:{
    fontSize:12,
    fontWeight:'600'
  }
});

export default ConfirmationCode;