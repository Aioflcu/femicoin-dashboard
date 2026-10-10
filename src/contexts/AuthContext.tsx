import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  displayName: string;
  profilePicture: string;
}

interface User {
  username: string;
  profile: UserProfile;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_CREDENTIALS = { username: 'Linda Kate Peter', password: 'linda2024' };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    for (const key of ['gv_deposit_confirmed', 'gv_deposit_pending', 'gv_deposit_pending_time', 'gv_withdrawal_requirements']) {
      localStorage.removeItem(key);
    }
    localStorage.removeItem('gv_user');
    const saved = sessionStorage.getItem('gv_demo_user');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      return parsed.username === USER_CREDENTIALS.username && parsed.profile ? parsed : null;
    } catch {
      sessionStorage.removeItem('gv_demo_user');
      return null;
    }
  });

  const isAuthenticated = !!user;

  const login = (username: string, password: string): boolean => {
    const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();
    if (norm(username) === norm(USER_CREDENTIALS.username) && password.trim() === USER_CREDENTIALS.password) {
      const u: User = { username: USER_CREDENTIALS.username, profile: { displayName: USER_CREDENTIALS.username, profilePicture: '' } };
      setUser(u);
      sessionStorage.setItem('gv_demo_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('gv_demo_user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, profile: { ...user.profile, ...updates } };
    setUser(updated);
    sessionStorage.setItem('gv_demo_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
