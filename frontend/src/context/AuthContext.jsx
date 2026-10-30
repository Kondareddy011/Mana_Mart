import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('cgh_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cgh_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginAsAdmin = async (username, password) => {
    try {
      const res = await api.adminLogin({ username, password });
      if (res.token) {
        setIsAdmin(true);
        setAdminUser(res.user);
        localStorage.setItem('cgh_admin_auth', 'true');
        localStorage.setItem('cgh_admin_user', JSON.stringify(res.user));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem('cgh_admin_auth');
    localStorage.removeItem('cgh_admin_user');
  };

  return (
    <AuthContext.Provider value={{
      isAdmin,
      adminUser,
      loginAsAdmin,
      logoutAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
