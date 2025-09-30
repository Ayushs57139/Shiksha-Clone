import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  });

  const loadUser = useCallback(async () => {
    try {
      setError(null);
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Load user error:', error);
      setError(error);
      // Don't call logout here as it might cause infinite loops
      // Just clear the token and user state
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (storageError) {
        console.error('Error clearing localStorage in loadUser:', storageError);
      }
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          await loadUser();
        } else {
          setLoading(false);
        }
        setInitialized(true);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError(error);
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [token, loadUser]);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      try {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
      }
      
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      try {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
      }
      
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors
      };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed'
      };
    }
  };

  const value = {
    user,
    token,
    loading: loading || !initialized,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  try {
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  } catch (error) {
    console.error('AuthProvider error:', error);
    // Return a fallback provider that doesn't crash
    return (
      <AuthContext.Provider value={{
        user: null,
        token: null,
        loading: false,
        login: async () => ({ success: false, message: 'Auth system unavailable' }),
        register: async () => ({ success: false, message: 'Auth system unavailable' }),
        logout: () => {},
        updateProfile: async () => ({ success: false, message: 'Auth system unavailable' }),
        isAuthenticated: false,
        isAdmin: false
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
};