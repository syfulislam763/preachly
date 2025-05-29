

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
  primaryText, 
  primaryTextSize, 
  primaryTitle, 
  primaryTitleSize 
} from '../../components/Constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';

export default function SignInScreen({ navigation }) {
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
            <Text style={styles.title}>Enter your email</Text>
            <Text style={styles.text}>The email confirmation will be sent there</Text>
            
            <CommonInput
              type='email'
              placeholder="example@gmail.com"
              value={email}
              onChangeText={(e) => setEmail(e)}
              style={styles.input}
              placeholderColor='#ACC6C5'
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CommonButton
            btnText={"Send Confirmation email"}
            bgColor={"#005A55"}
            navigation={navigation}
            route={"ConfirmationEmail"}
            txtColor={"#fff"}
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
  },
  title: {
    fontSize: primaryTitleSize,
    fontFamily:"DMSerifDisplay",
    marginBottom: 16,
  }, 
  text: {
    fontSize: primaryTextSize,
    paddingTop: 10,
    paddingBottom: 40,
    boxSizing: 'border-box',
    color: '#2B4752',
    fontFamily:'NunitoSemiBold'
  },
  input: {
    marginBottom: 20,
    borderColor: '#ACC6C5',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 90,
  }
});