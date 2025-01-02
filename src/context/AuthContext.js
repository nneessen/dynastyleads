'use client'; // if using the App Router

import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, getCurrentUser } from '@/lib/auth/authService';

const AuthContext = createContext();

// If you want static initial state:
// const initialState = { user: null, isLoading: true };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, try to get the current user from the server
  // which uses cookies to see if there's a valid session
  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const u = await getCurrentUser();
        // If getCurrentUser returns a user object, store it
        // If it returns null or throws an error, user remains null
        if (u) setUser(u);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function login(email, password) {
    try {
      setIsLoading(true);
      const { user: loggedInUser } = await loginUser({ email, password });
      // loginUser might set cookies on the server side
      // and return the user object in the response.
      console.log(loggedInUser);
      setUser(loggedInUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      setIsLoading(true);
      await logoutUser();
      // logoutUser can clear cookies on the server side
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
