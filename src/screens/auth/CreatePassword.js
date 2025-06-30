
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Keyboard, 
  Pressable, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
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
import { create_password, handleToast } from './AuthAPI';
import { useRoute } from '@react-navigation/native';
import Indicator from '../../components/Indicator';
import { useNavigation } from '@react-navigation/native';

export default function CreatePassword() {
  const { updateStore } = useAuth();
  const [password, setPassword] = useState("");
  const route = useRoute()
  const navigation = useNavigation()
  
  const [loading, setLoading] = useState(false)
  const handleSignUpComplete = () => {
    const payload = {
      ...route.params,
      password: password,
      password2: password
    }
    
    //
    setLoading(true)
    create_password(payload, (res, isSuccess)=>{
      if(isSuccess){
        setLoading(false)
        updateStore(res.data)
        handleToast("success", "User is created!",2000, () => {
          navigation.navigate("FinishAuthentication")
        })
      }else{
        setLoading(false)
        console.log("error", res)
      }
    })
  }

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
            <View style={{paddingTop:16}}></View>
            <Text style={styles.title}>Create a password</Text>
            <Text style={styles.text}>The password must be longer than 8 characters, contain numbers and letters</Text>
            
            <CommonInput
              type='password'
              placeholder="Enter password"
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={password.length>8?{...styles.input, borderColor:deepGreen}:styles.input}
              placeholderColor='#607373'
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CommonButton
            btnText={"Save"}
            bgColor={password.length>8?deepGreen:lightgreen1}
            navigation={navigation}
            route={""}
            handler={handleSignUpComplete}
            txtColor={password.length>8?"white": deepGreen}
            bold='bold'
            opacity={1}
            disabled={password.length<=8}
          />
        </View>
      </Pressable>
      {loading && <Indicator visible={loading} onClose={() => setLoading(false)}>
          <ActivityIndicator size={"large"}/>
        </Indicator>}
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
  },
  title: {
    fontSize: primaryTitleSize,
    fontFamily:'DMSerifDisplay',
    marginBottom: 8,
    color:'#0B172A'
  }, 
  text: {
    fontSize: 17,
    padding: 20,
    boxSizing: 'content-box',
    fontFamily:'NunitoSemiBold',
    color: '#2B4752',

  },
  input: {
    marginBottom: 20,
    marginTop:20,
    borderColor: '#ACC6C5',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 30,
  }
});