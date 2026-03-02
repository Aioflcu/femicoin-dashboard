import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  displayName: string;
  profilePicture: string;
}

interface User {
  username: string;
  role: 'user' | 'admin';
  profile: UserProfile;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = { username: 'Marvellous-Username', password: 'Marvellous0808-password' };
const USER_CREDENTIALS = { username: 'Catherine Archer', password: 'archer2024' };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gv_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const u: User = { username, role: 'admin', profile: { displayName: username, profilePicture: '' } };
      setUser(u);
      localStorage.setItem('gv_user', JSON.stringify(u));
      return true;
    }
    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
      const u: User = { username, role: 'user', profile: { displayName: username, profilePicture: '' } };
      setUser(u);
      localStorage.setItem('gv_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gv_user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, profile: { ...user.profile, ...updates } };
    setUser(updated);
    localStorage.setItem('gv_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
