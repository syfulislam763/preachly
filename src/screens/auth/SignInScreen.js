

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Keyboard, 
  Pressable, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
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

export default function SignInScreen ({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");

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
              style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <CommonInput
              type='password'
              placeholder="Enter password"
              value={email}
              onChangeText={(e) => setEmail(e)}
              style={styles.input}
              placeholderColor='#607373'
            />
            <Text style={styles.forgotPass}>Forgot password?</Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CommonButton
            btnText={"Log in"}
            bgColor={lightgreen1}
            navigation={navigation}
            route={"FinishAuthentication"}
            txtColor={deepGreen}
            opacity={1}
          />
        </View>
      </Pressable>
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
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 90,
  },
  forgotPass:{
    fontFamily:'NunitoExtraBold',
    fontSize: 16,
    
    textDecorationLine: 'underline',
    color: '#000'
  }
});