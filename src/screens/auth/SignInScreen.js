

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Keyboard, 
  Pressable, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import CommonInput from '../../components/CommonInput';
import { 
  deepGreen,
  lightgreen1,
  primaryText, 
  primaryTextSize, 
  primaryTitle, 
  primaryTitleSize 
} from '../../components/Constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { handleToast, login } from './AuthAPI';
import Indicator from '../../components/Indicator';
import { useNavigation } from '@react-navigation/native';
import { onboarding_status } from '../personalization/PersonalizationAPIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../../context/api';

export default function SignInScreen () {
  const context = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleLogin = () => {
    const payload = {
      email: email,
      password: password
    }
    
    setLoading(true)
    login(payload, (res, success) => {
      
      if(success){
      
        onboarding_status(res?.data?.access, (statusRes, isOk) => {
          setLoading(false)
          if(isOk){
            const store = {...res?.data, onboarding_completed:statusRes?.data?.onboarding_completed}
            
            if(store?.onboarding_completed){
              context.updateStore(store)
              setAuthToken(store?.access, store?.refresh, async () => {
                await AsyncStorage.setItem('store', JSON.stringify(store));
              })
              context.login()
            }else{
              
              context.updateStore(store)
              setAuthToken(store?.access, store?.refresh, async () => {
                await AsyncStorage.setItem('store', JSON.stringify(store));
              })
              navigation.navigate("FinishAuthentication")
            }
           
            
          }else{
            handleToast("error", "onboarding status error", 3000, () => {})
          }
        })
      }else{
        setLoading(false)
        console.log(res.response)
        handleToast("error", "Something went wrong, try again!", 3000, () => {})
      }
    })
  }

  const [keyboardOffset, setKeyboardOffset] = useState(30);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      const height = e.endCoordinates.height;
      console.log(height)
      const safeOffset = Math.min(height, 100); 
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardOffset(safeOffset);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardOffset(30);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.label}>Email</Text>
            <CommonInput
              type='email'
              placeholder=""
              value={email}
              onChangeText={(e) => setEmail(e)}
              style={email.length>0?{...styles.input, ...styles.activeInput}:styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <CommonInput
              type='password'
              placeholder="Enter password"
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={password.length>0?{...styles.input, ...styles.activeInput}:styles.input}
              placeholderColor='#607373'
            />
            <Text style={styles.forgotPass}>Forgot password?</Text>
          </View>
        </ScrollView>

        <View style={[styles.buttonContainer, { paddingBottom: keyboardOffset }]}>
          <CommonButton
            btnText={"Log in"}
            bgColor={!(email.length && password.length)?lightgreen1:deepGreen}
            navigation={navigation}
            route={""}
            handler={handleLogin}
            txtColor={!(email.length && password.length)?deepGreen:"white"}
            disabled={ !(email.length && password.length) }
            opacity={1}
          />
        </View>
      </Pressable>
      {loading && 
        <Indicator visible={loading} onClose={() => setLoading(false)}>
          <ActivityIndicator size={"large"}/>
        </Indicator>
      }
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    backgroundColor:'#fff',
    paddingVertical: 35
  },
  label: {
    fontFamily:'NunitoSemiBold',
    fontSize:16,
    color: "#2B4752"
  },
  input: {
    marginBottom: 20,
    height: 57,
    borderWidth: 1,
    borderColor: '#ACC6C5',
    ':focus': {
      borderColor: deepGreen,
      outlineStyle: 'none'
    }
  },
  activeInput:{
    borderColor:"#005A55"
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 90,
  },
  forgotPass:{
    fontFamily:'NunitoExtraBold',
    fontSize: 16,
    
    textDecorationLine: 'underline',
    color: '#0B172A'
  }
});