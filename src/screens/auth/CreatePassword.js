
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

export default function CreatePassword({ navigation }) {
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
            <View style={{paddingTop:16}}></View>
            <Text style={styles.title}>Create a password</Text>
            <Text style={styles.text}>The password must be longer than 8 characters, contain numbers and letters</Text>
            
            <CommonInput
              type='default'
              placeholder="Enter password"
              value={email}
              onChangeText={(e) => setEmail(e)}
              style={styles.input}
              placeholderColor='#607373'
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CommonButton
            btnText={"Save"}
            bgColor={lightgreen1}
            navigation={navigation}
            route={"FinishAuthentication"}
            txtColor={deepGreen}
            bold='bold'
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
    fontFamily:'DMSerifDisplay',
    marginBottom: 8,
  }, 
  text: {
    fontSize: primaryTextSize,
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
    paddingBottom: Platform.OS === 'ios' ? 30 : 90,
  }
});