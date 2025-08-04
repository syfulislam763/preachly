// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ROOT_URL , TOKEN_URL} from './Paths';
import { handleToast } from '../screens/auth/AuthAPI';


// Replace with your API base URL
const api = axios.create({
  baseURL: ROOT_URL,
});



export const loadAuthToken = async (cb) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const store = await AsyncStorage.getItem('store');

  if (accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  cb({
    accessToken,
    refreshToken,
    store: store ? JSON.parse(store) : null,
  });
};

export const getNewAccessToken = async (refreshToken, cb) => {
  try {
    const response = await api.post(TOKEN_URL, { refreshToken });
    const { accessToken } = response.data;
    await setAuthToken(accessToken, refreshToken, () => {});
    return accessToken;
  } catch (error) {
    console.error('Error getting new access token:', error);
    throw error;
  }
};

export const setAuthToken = async (accessToken, refreshToken, cb) => {
  await AsyncStorage.setItem('accessToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  cb()
};

export const logoutUser = async (cb) => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('store');
  await AsyncStorage.clear();
  delete api.defaults.headers.common['Authorization'];

  cb && cb();
};

api.interceptors.response.use(
  response => response,
  async error => {
    if(error.response?.status == 523){
      //handleToast("error", "Try again please, network error", 2000, ()=>{})
    }
    if (error.response?.status === 401) {
      // Access to navigation should be passed manually
      // OR use a global navigationRef pattern if needed
      handleToast("error", "Login again please", 2000, ()=>{})
    }
    return Promise.reject(error);
  }
);

export default api;
