import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

// Create a context to hold authentication information
const AuthContext = createContext();

// Create a provider component to manage authentication state
const UserProvider = ({ children }) => {
  // Initialize state for userId using a function that reads from cookies
  const [userId, setUserId] = useState(() => {
    const savedUserId = Cookies.get('userId');
    return savedUserId || null;
  });

  // Initialize state for UserType using a function that reads from cookies
  const [UserType, setUserType] = useState(() => {
    const savedUserType = Cookies.get('UserType');
    return savedUserType || null;
  });

  // Function to set user information and store it in cookies
  const setUser = (id, type) => {
    console.log(`Setting UserType to: ${type}`);
    setUserId(id);
    setUserType(type);
    Cookies.set('userId', id, { expires: 7 });
    Cookies.set('UserType', type, { expires: 7 });
    console.log(`Set UserType to: ${type}`);
  };

  // Provide the authentication context to its children
  return (
    <AuthContext.Provider value={{ userId, UserType, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { UserProvider, AuthContext };