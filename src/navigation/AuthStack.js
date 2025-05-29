import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import AuthHome from '../screens/auth/AuthHome';
import ConfirmationEmail from '../screens/auth/ConfirmationEmail';
import ConfirmationCode from '../screens/auth/ConfirmationCode';
import CreatePassword from '../screens/auth/CreatePassword';
import FinishAuthentication from '../screens/auth/FinishAuthentication';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome" 
        component={WelcomeScreen} />
        <Stack.Screen
        options={{ headerShown: false }}
        name="AuthHome" 
        component={AuthHome} />

      <Stack.Screen  
        options={({ navigation }) => ({
        title: "Sign Up",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'NunitoSemiBold',
          color: '#0b172A',
          fontSize: 16
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#fff',
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <Ionicons name="arrow-back" size={20} color="#0b172A" />
          </TouchableOpacity>
        ),
      })} 
      name="SignUp" 
      component={SignUpScreen} 
      />

      <Stack.Screen 
          options={({ navigation }) => ({
            title: "",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'NunitoSemiBold',
              color: '#0b172A',
            },
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              backgroundColor: '#fff',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButtonContainer}
              >
                <Ionicons name="arrow-back" size={20} color="#0b172A" />
              </TouchableOpacity>
            ),
          })}
        name="ConfirmationEmail" 
        component={ConfirmationEmail} 
      />
        <Stack.Screen
          options={({ navigation }) => ({
          title: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'NunitoSemiBold',
            color: '#0b172A',
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Ionicons name="arrow-back" size={20} color="#0b172A" />
            </TouchableOpacity>
          ),
        })} 
        name="ConfirmationCode" 
        component={ConfirmationCode} 
      />

       <Stack.Screen 
       options={({ navigation }) => ({
          title: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'NunitoSemiBold',
            color: '#0b172A',
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Ionicons name="arrow-back" size={20} color="#0b172A" />
            </TouchableOpacity>
          ),
        })} 
      name="CreatePassword" 
      component={CreatePassword} 
      />
      <Stack.Screen 
      options={({ navigation }) => ({
          title: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'NunitoSemiBold',
            color: '#0b172A',
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Ionicons name="arrow-back" size={20} color="#0b172A" />
            </TouchableOpacity>
          ),
        })} 
      name="FinishAuthentication" 
      component={FinishAuthentication} 
      />

      <Stack.Screen 
      options={({ navigation }) => ({
          title: "Log in",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'NunitoSemiBold',
            color: '#0b172A',
            fontSize: 16
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Ionicons name="arrow-back" size={20} color="#0b172A" />
            </TouchableOpacity>
          ),
        })}   
      name="SignIn" 
      component={SignInScreen} 
      />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  backButtonContainer: {
    backgroundColor: '#EDF3F3',
    height:40,
    width:40,
    padding: 8,
    marginLeft: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})