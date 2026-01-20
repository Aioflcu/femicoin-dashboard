import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  displayName: string;
  profilePicture: string;
}

interface User {
  username: string;
  profile: UserProfile;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { success: boolean; isAdmin: boolean };
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_CREDENTIALS = {
  username: 'Bryanvoth 105',
  password: 'xgbto1234',
};

const ADMIN_CREDENTIALS = {
  username: 'Marvellous-Username',
  password: 'Marvellous0808-password',
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

  const login = (username: string, password: string): { success: boolean; isAdmin: boolean } => {
    // Check admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData = { 
        username, 
        profile: { displayName: 'Admin', profilePicture: '' }, 
        isAdmin: true 
      };
      setUser(userData);
      localStorage.setItem('wicn_user', JSON.stringify(userData));
      return { success: true, isAdmin: true };
    }
    
    // Check user credentials
    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
      const savedProfile = localStorage.getItem('wicn_profile');
      const profile = savedProfile ? JSON.parse(savedProfile) : DEFAULT_PROFILE;
      const userData = { username, profile, isAdmin: false };
      setUser(userData);
      localStorage.setItem('wicn_user', JSON.stringify(userData));
      return { success: true, isAdmin: false };
    }
    
    return { success: false, isAdmin: false };
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
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isAdmin: user?.isAdmin || false, updateProfile }}>
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
