import React, { createContext, useState, useContext } from 'react';

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

  return (
    <AuthContext.Provider value={{ isAuthenticated, isPersonalized, isSubscribed, store, login, completePersonalization, completeSubscription,updateStore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};