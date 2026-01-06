import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Coins, Eye, EyeOff, Lock, User, Shield, TrendingUp, Globe, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Welcome back, Bryan!",
        description: "Successfully logged in to WICN",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const features = [
    { icon: Shield, label: 'Secure & Encrypted', delay: 0.1 },
    { icon: TrendingUp, label: 'Live Market Data', delay: 0.2 },
    { icon: Globe, label: 'Global Access', delay: 0.3 },
    { icon: Zap, label: 'Instant Trading', delay: 0.4 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Animated background gradient that follows mouse */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
          background: [
            'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(var(--warning)) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          ],
        }}
        transition={{
          x: { type: 'spring', stiffness: 50, damping: 30 },
          y: { type: 'spring', stiffness: 50, damping: 30 },
          background: { duration: 5, repeat: Infinity },
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo with hover effects */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-warning to-primary flex items-center justify-center shadow-lg relative overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,215,0,0.3)',
                  '0 0 40px rgba(255,215,0,0.5)',
                  '0 0 20px rgba(255,215,0,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Coins className="w-9 h-9 text-primary-foreground relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-2xl sm:text-3xl font-display font-bold text-gradient leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            WORLDWIDE INVESTMENT
          </motion.h1>
          <motion.h1 
            className="text-2xl sm:text-3xl font-display font-bold text-gradient leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            COMPENSATION NETWORK
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            WICN - Your Gateway to Crypto
          </motion.p>
        </motion.div>

        {/* Feature badges with hover */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'hsl(var(--primary) / 0.2)',
                borderColor: 'hsl(var(--primary) / 0.5)',
              }}
            >
              <feature.icon className="w-3 h-3" />
              <span>{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Card with glass effect */}
        <motion.div 
          className="glass-card rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ 
            boxShadow: '0 25px 50px -12px rgba(255,215,0,0.15)',
          }}
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <h2 className="text-2xl font-display font-semibold mb-6 text-center relative z-10">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 transition-all focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 transition-all focus:ring-2 focus:ring-primary/20"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                variant="gold" 
                size="xl" 
                className="w-full mt-6 relative overflow-hidden"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div 
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.p 
            className="text-center text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome, Bryan Voth
          </motion.p>
        </motion.div>

        {/* Support info */}
        <motion.div 
          className="mt-6 text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground">Need help? Contact Support</p>
          <div className="flex justify-center gap-4">
            <motion.a
              href="mailto:internationalinvestmentcompens@gmail.com"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              📧 Email Support
            </motion.a>
            <motion.a
              href="https://t.me/JamesRace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              💬 @JamesRace
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Secure • Fast • Reliable
        </motion.p>

        {/* Live stats ticker */}
        <motion.div
          className="mt-8 overflow-hidden rounded-xl bg-secondary/30 border border-border/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-8 py-3 px-4 text-xs text-muted-foreground whitespace-nowrap"
            animate={{ x: [0, -500] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              BTC $97,234.56 <span className="text-success">+2.4%</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              ETH $3,612.89 <span className="text-success">+1.8%</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              SOL $189.45 <span className="text-destructive">-0.5%</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              BNB $612.34 <span className="text-success">+3.1%</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              BTC $97,234.56 <span className="text-success">+2.4%</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              ETH $3,612.89 <span className="text-success">+1.8%</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;