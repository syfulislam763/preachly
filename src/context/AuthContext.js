import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const login = () => setIsAuthenticated(true);
  const completePersonalization = () => setIsPersonalized(true);
  const completeSubscription = () => setIsSubscribed(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isPersonalized, isSubscribed, login, completePersonalization, completeSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};