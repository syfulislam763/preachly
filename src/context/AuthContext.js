import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadAuthToken } from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const login = () => setIsAuthenticated(true);
  const completePersonalization = () => setIsPersonalized(true);
  const completeSubscription = () => setIsSubscribed(true);
  

  const [store, setStore] = useState({})

  const updateStore = (data) => {
    setStore({...store, ...data})
  }

  const logout =  () => {
    setIsAuthenticated(false);
    setIsPersonalized(false);
    setIsSubscribed(false);
    setStore({});
  };

  useEffect(() => {
    loadAuthToken((data) => { 
      //console.log("AuthContext data", data);
      if (data.accessToken) {
        setIsAuthenticated(true);
        setStore(data.store || {});

      } else {
        setIsAuthenticated(false);
        setStore({});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isPersonalized, isSubscribed, store, login,logout, completePersonalization, completeSubscription,updateStore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};