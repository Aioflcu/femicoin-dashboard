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
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_CREDENTIALS = {
  username: 'Bryanvoth',
  password: 'xgbto1234',
};

const DEFAULT_PROFILE: UserProfile = {
  displayName: 'Bryan Voth',
  profilePicture: '',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('wicn_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username: string, password: string): boolean => {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      const savedProfile = localStorage.getItem('wicn_profile');
      const profile = savedProfile ? JSON.parse(savedProfile) : DEFAULT_PROFILE;
      const userData = { username, profile };
      setUser(userData);
      localStorage.setItem('wicn_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wicn_user');
  };

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    if (user) {
      const updatedProfile = { ...user.profile, ...profileUpdate };
      const updatedUser = { ...user, profile: updatedProfile };
      setUser(updatedUser);
      localStorage.setItem('wicn_user', JSON.stringify(updatedUser));
      localStorage.setItem('wicn_profile', JSON.stringify(updatedProfile));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
