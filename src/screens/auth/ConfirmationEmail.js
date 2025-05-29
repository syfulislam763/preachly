

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
  lighgreen,
  lightgreen1,
  primaryText, 
  primaryTextSize, 
  primaryTitle, 
  primaryTitleSize 
} from '../../components/Constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';

export default function ConfirmationEmail({ navigation }) {
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
            <Text style={styles.title}>Confirmation email has been sent</Text>
            <Text style={styles.text}>Check your email for qwerty123@gmail.com to which the confirmation email was sent</Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CommonButton
            btnText={"Change email"}
            bgColor={lightgreen1}
            navigation={navigation}
            route={"ConfirmationCode"}
            txtColor={"#2B4752"}
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
    paddingTop:20
  },
  title: {
    fontSize: primaryTitleSize,
    fontFamily:'DMSerifDisplay',
    marginBottom: 8,
    flexWrap:'wrap'
  }, 
  text: {
    fontSize: primaryTextSize,
    paddingTop: 10,
    paddingBottom: 30,
    boxSizing: 'border-box',
    color: '#2B4752',
    textAlign:'center',
    fontFamily:'NunitoSemiBold'

  },
  input: {
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 50,
  }
});