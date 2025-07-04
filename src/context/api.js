// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ROOT_URL } from './Paths';

// Replace with your API base URL
const api = axios.create({
  baseURL: ROOT_URL,
});


export const loadAuthToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};


export const setAuthToken = async (token) => {
  await AsyncStorage.setItem('authToken', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const logoutUser = async (navigation) => {
  await AsyncStorage.removeItem('authToken');
  delete api.defaults.headers.common['Authorization'];

  Alert.alert('Session expired', 'Please log in again.');

  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  );
};

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Access to navigation should be passed manually
      // OR use a global navigationRef pattern if needed
      console.warn('Token expired or unauthorized. Handle logout manually.');
    }
    return Promise.reject(error);
  }
);

export default api;
