import React, { createContext, useState, useContext } from 'react';
import { message } from 'antd';
import { login as loginApi, registerUser } from '../utils/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Stores user data (e.g., email, token)

  // Helper: Log in a user
  const login = async (email, password) => {
    try {
      const { token, email: userEmail } = await loginApi(email, password);
      localStorage.setItem('jwt_token', token); // Save token in localStorage
      setUser({ email: userEmail, token }); // Update user state
      message.success(`Logged in as ${userEmail}`);
    } catch (err) {
      message.error('Login failed. Please check your credentials.');
      throw err;
    }
  };

  // Helper: Register a user
  const register = async (email, password) => {
    try {
      const { email: userEmail } = await registerUser(email, password);
      message.success(`Registered successfully as ${userEmail}`);
    } catch (err) {
      message.error('Registration failed.');
      throw err;
    }
  };

  // Helper: Log out a user
  const logout = () => {
    localStorage.removeItem('jwt_token'); // Clear token from localStorage
    setUser(null); // Reset user state
    message.success('Logged out successfully');
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
