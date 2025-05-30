import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import CommonButton from '../../components/CommonButton';
import { deepGreen , primaryText} from '../../components/Constant';
import { useAuth } from '../../context/AuthContext';


const { width, height } = Dimensions.get('window');

const FinishAuthentication = ({ navigation }) => {

  const {login} = useAuth()


  return (
    <View style={styles.container}>
    
      <View style={styles.textContainer}>
        <Text style={styles.successText}>You're in!</Text>
        <Text style={styles.welcomeTitle}>Welcome to Preachly</Text>
        <Text style={styles.subtitle}>
          Let's tailor your experience to help you grow in faith and confidence.
        </Text>
      </View>
        <Image
            source={require('../../../assets/img/Preachly.png')}
            style={{
                height:'100%', 
                width:'100%', 
                objectFit:'contain',
                position:'absolute',
                top: (height*16)/100,
                left:0,
                right:0,
                zIndex: 1
            }}
        />

        <View style={styles.btnContainer}>
            <CommonButton
                btnText={"Go to personalization"}
                bgColor={deepGreen}
                navigation={navigation}
                route={""}
                handler={() => login()}
                txtColor={primaryText}
                bold='bold'
                opacity={1}
            />
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position:'relative'
  },
  textContainer: {
    height: height * (1/5),
    width: '100%',
    backgroundColor:'#fff',
    marginTop:'8%',
    padding:20
  },
  imageSection: {
    height: height * (3/4),
    width: '100%',
    backgroundColor: 'green',
  },
  btnContainer:{
    paddingHorizontal: 20,
    position:'absolute',
    bottom: (height*6)/100,
    left:0,
    right:0,
    zIndex: 1
  },
  successText: {
    fontSize: 32,
    fontFamily:'DMSerifDisplay'
  },
  welcomeTitle: {
    fontSize: 32,
    fontFamily:'DMSerifDisplay'
  },
  subtitle: {
    color: '#2B4752',
    textAlign: 'center',
    fontFamily:'NunitoSemiBold',
    fontSize: 17,
    padding: 20
  },
  button: {
    backgroundColor: '#005A55',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: width * 0.8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FinishAuthentication;