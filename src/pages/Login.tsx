import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Activity, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({ title: 'Missing fields', description: 'Enter username and password', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const success = login(username, password);
    setIsLoading(false);
    if (success) {
      toast({ title: 'Welcome back', description: `Logged in as ${username}` });
      // Check role after login
      const saved = localStorage.getItem('gv_user');
      const user = saved ? JSON.parse(saved) : null;
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast({ title: 'Login failed', description: 'Invalid credentials', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[120px]"
          style={{ background: 'hsl(var(--primary) / 0.08)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full blur-[100px]"
          style={{ background: 'hsl(var(--accent) / 0.06)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4"
            style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.3)' }}
            animate={{ boxShadow: ['0 0 20px hsl(var(--primary) / 0.2)', '0 0 40px hsl(var(--primary) / 0.4)', '0 0 20px hsl(var(--primary) / 0.2)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Activity className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-wider text-foreground font-display">
            GAIN-VESTOR
          </h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">
            Secure Access
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-6 space-y-5" style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.05)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium tracking-wide neon-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-3 border-t border-border/30 text-center">
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              Protected by GAIN-VESTOR Security
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
