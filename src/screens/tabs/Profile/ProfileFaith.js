import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import CommonButton from '../../../components/CommonButton';
import { deepGreen , primaryText} from '../../../components/Constant';
import { useAuth } from '../../../context/AuthContext';
import ParagraphIcon from '../../../components/ParagraphIcon';
import CustomHeader from '../../../components/CustomNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReusableNavigation from '../../../components/ReusabeNavigation';
import BackButton from '../../../components/BackButton';

const { width, height } = Dimensions.get('window');

const ProfileFaith = ({ navigation }) => {

  const {completePersonalization} = useAuth()


  return (
    <SafeAreaView style={styles.container}>
        <ReusableNavigation 
            backgroundStyle={{backgroundColor:'#fff'}}
            leftComponent={() => <BackButton navigation={navigation}/>}
            middleComponent={()=>{}}
            RightComponent={()=>{}}
        />
        <View style={{marginTop:10}}>
            <Text style={styles.title}>Well Done!</Text>
            <Text style={styles.title}>Keep Growing in Faith</Text>
        </View>
        <View style={{marginTop:30}}>
            <Text style={styles.text}> Your commitment to deepening your faithis building a strong foundation.Keep going—there’s more ahead!</Text>
        </View>
        <Image
            source={require('../../../../assets/img/bg_bible_frame.png')}
            style={{
                height:'100%', 
                width:'100%', 
                objectFit:'contain',
                position:'absolute',
                top: (height*17)/100,
                left:0,
                right:0,
                zIndex: 1
            }}
        />

        <View style={styles.btnContainer}>
            <CommonButton
                btnText={"Find Answers"}
                bgColor={deepGreen}
                navigation={navigation}
                route={"MainTabs"}
                // handler={() => completePersonalization()}
                txtColor={primaryText}
                bold='bold'
                opacity={1}
            />
        </View>
      
    </SafeAreaView>
  );
};


export default ProfileFaith;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
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
    bottom: (height*13)/100,
    left:0,
    right:0,
    zIndex: 1
  },
  title:{
    fontFamily:'DMSerifDisplay',
    fontSize:32,
    color:'#0B172A',
    textAlign:'center',
  },
  text:{
    fontFamily:"NunitoBold",
    color:"#2B4752",
    fontSize: 17,
    textAlign:'center',
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
