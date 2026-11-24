import { createContext, useContext, useState, useCallback } from 'react';
import { users } from '../data/fakeData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ems_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      const userData = { ...found };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('ems_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid username or password' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ems_user');
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('ems_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const changePassword = useCallback((oldPassword, newPassword) => {
    const found = users.find(u => u.id === user?.id);
    if (found && found.password === oldPassword) {
      found.password = newPassword;
      return { success: true, message: 'Password changed successfully' };
    }
    return { success: false, message: 'Old password is incorrect' };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
