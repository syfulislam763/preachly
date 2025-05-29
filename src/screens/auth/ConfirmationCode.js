import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deepGreen, lighgreen } from '../../components/Constant';


const zero = require("../../../assets/img/Button0.png")
const one = require("../../../assets/img/Button1.png")
const two = require("../../../assets/img/Button2.png")
const three = require("../../../assets/img/Button3.png")
const four = require("../../../assets/img/Button4.png")
const five = require("../../../assets/img/Button5.png")
const six = require("../../../assets/img/Button6.png")
const seven = require("../../../assets/img/Button7.png")
const eight = require("../../../assets/img/Button8.png")
const nine = require("../../../assets/img/Button9.png")
const ten = require("../../../assets/img/Button10.png")



const ConfirmationCode = ({ email = 'qwerty123@gmail.com', navigation }) => {
  const [code, setCode] = useState('');

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
        <View style={styles.codeContainer}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={styles.codeDigit}>
              <Text style={styles.codeText}>
                {code[i] || ' '}
              </Text>
              <View style={code[i]?{...styles.underline, backgroundColor:deepGreen}:styles.underline} />
            </View>
          ))}
        </View>

        {/* Resend Link */}
        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't get it? <Text style={styles.resendLink}>Resend code</Text>
          </Text>
        </TouchableOpacity>


      </View>

      {/* Keypad */}
      <View style={styles.keypad}>
        {[
          [{img:one,id:1, txt: ""}, {img:two,id:2, txt: "ABC"}, {img:three,id:3, txt:"DEF"}],
          [{img:four,id:4, txt:"GHI"}, {img:five,id:5, txt:"JKL"}, {img:six,id:6, txt:"MNO"}],
          [{img:seven,id:7,txt:"PQRS"}, {img:eight,id:8,txt:"TUV"}, {img:nine,id:9,txt:"WXYZ"}],
          [{img:ten, id: 10, txt:""}, {img:zero, id:0,txt:""}, {img:ten, id:11,txt:""}]
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((obj, index) => (
              <TouchableOpacity
                key={index}
                style={(obj.id == 10 || obj.id == 11)? {...styles.keypadKey, backgroundColor:"#d0d4dc", borderBottomWidth:0} : styles.keypadKey}
                onPress={() => handleKeyPress(obj.id)}
              >

                {(obj.id == 10 || obj.id == 11)?<>
                  <Ionicons name="backspace-outline" size={30} color="black" />
                </>:
                <>
                  {obj.id ==0 ?<Text 
                    style={styles.number}
                  >{obj.id}</Text>
                  : <>
                    <Text style={styles.number}>{obj.id}</Text>
                    <Text style={styles.abc}>{obj.txt}</Text>
                  </>}
                </>}
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
  },
  resendLink: {
    color: '#005A55',
    fontWeight: 'bold',
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