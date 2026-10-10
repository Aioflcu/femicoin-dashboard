import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Activity, Globe, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [hasNotifications] = useState(true);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg neon-glow">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-gradient hidden sm:block tracking-wider">GAIN-VESTOR</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setCurrentLang(lang)} className={currentLang.code === lang.code ? 'bg-secondary' : ''}>
                  <span className="mr-2">{lang.flag}</span>{lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {hasNotifications && <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full neon-glow" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                  {user?.profile?.profilePicture ? (
                    <img src={user.profile.profilePicture} alt={user.profile.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <span className="hidden sm:inline font-medium">{user?.profile?.displayName || user?.username}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/profile')}><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div role="note" className="border-t border-border/50 bg-primary/10 px-4 py-2 text-center text-xs text-foreground">
        <strong>TRADE WISELY</strong>
      </div>
    </header>
  );
};

export default Header;
