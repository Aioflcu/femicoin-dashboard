import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import SplashScreen from '@/components/SplashScreen';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem('wicn_splash_shown');
    return !hasSeenSplash;
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSplashComplete = () => {
    sessionStorage.setItem('wicn_splash_shown', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <Login />;
};

export default Index;
