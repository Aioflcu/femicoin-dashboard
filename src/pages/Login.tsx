import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Coins, Eye, EyeOff, Lock, User, Shield, TrendingUp, Globe, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const backgroundX = useTransform(smoothX, [0, window.innerWidth], [-50, 50]);
  const backgroundY = useTransform(smoothY, [0, window.innerHeight], [-50, 50]);

  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const result = login(username, password);
    
    if (result.success) {
      if (result.isAdmin) {
        toast({
          title: "Welcome, Admin!",
          description: "Accessing admin panel",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Welcome back, Bryan!",
          description: "Successfully logged in to WICN",
        });
        navigate('/dashboard');
      }
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
    { icon: Shield, label: 'Secure & Encrypted', delay: 0.6 },
    { icon: TrendingUp, label: 'Live Market Data', delay: 0.7 },
    { icon: Globe, label: 'Global Access', delay: 0.8 },
    { icon: Zap, label: 'Instant Trading', delay: 0.9 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Cinematic animated background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep space background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 80%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 20% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Animated aurora effect */}
        <motion.div
          className="absolute inset-0"
          style={{ x: backgroundX, y: backgroundY }}
        >
          <motion.div 
            className="absolute top-0 left-1/4 w-[800px] h-[400px] rounded-full blur-[100px]"
            animate={{
              background: [
                'linear-gradient(180deg, hsl(var(--primary) / 0.4) 0%, transparent 100%)',
                'linear-gradient(180deg, hsl(var(--warning) / 0.3) 0%, transparent 100%)',
                'linear-gradient(180deg, hsl(var(--primary) / 0.4) 0%, transparent 100%)',
              ],
              y: [0, 50, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-[600px] h-[300px] rounded-full blur-[80px]"
            animate={{
              background: [
                'linear-gradient(0deg, hsl(var(--warning) / 0.3) 0%, transparent 100%)',
                'linear-gradient(0deg, hsl(var(--primary) / 0.4) 0%, transparent 100%)',
                'linear-gradient(0deg, hsl(var(--warning) / 0.3) 0%, transparent 100%)',
              ],
              y: [0, -30, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Floating orbs with parallax */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: 100 + i * 50,
              height: 100 + i * 50,
              background: `radial-gradient(circle, hsl(var(--primary) / ${0.1 + i * 0.02}) 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 30 * (i % 2 ? 1 : -1), 0],
              y: [0, 20 * (i % 2 ? -1 : 1), 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Grid with perspective */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/60"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * -500 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 50%, hsl(var(--primary) / 0.02) 50%)',
            backgroundSize: '100% 4px',
          }}
          animate={{ y: [0, 4] }}
          transition={{ duration: 0.1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo with cinematic entrance */}
        <AnimatePresence>
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-warning to-primary flex items-center justify-center shadow-2xl relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(var(--primary) / 0.4)',
                    '0 0 60px hsl(var(--primary) / 0.6)',
                    '0 0 30px hsl(var(--primary) / 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Coins className="w-10 h-10 text-primary-foreground relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-gradient leading-tight tracking-tight">
                WORLDWIDE INVESTMENT
              </h1>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-gradient leading-tight tracking-tight">
                COMPENSATION NETWORK
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground mt-3 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              WICN - Your Gateway to Crypto
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Feature badges with staggered animation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary/30 border border-primary/20 text-xs text-muted-foreground backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: feature.delay, type: 'spring', stiffness: 200 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'hsl(var(--primary) / 0.2)',
                borderColor: 'hsl(var(--primary) / 0.5)',
                boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
              }}
            >
              <feature.icon className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Card with cinematic entrance */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div 
              className="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-primary/10"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Animated glow border */}
              <motion.div
                className="absolute -inset-[1px] rounded-3xl opacity-50"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

              <motion.h2 
                className="text-2xl font-display font-semibold mb-6 text-center relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Sign In
              </motion.h2>
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-12 h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 bg-secondary/30"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="text-sm font-medium text-muted-foreground">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 bg-secondary/30"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="xl" 
                    className="w-full mt-6 h-14 text-lg relative overflow-hidden"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div 
                        className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        <span className="relative z-10 font-semibold">Sign In</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
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
                transition={{ delay: 0.8 }}
              >
                Welcome, Bryan Voth
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support info */}
        <motion.div 
          className="mt-8 text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-muted-foreground">Need help? Contact Support</p>
          <div className="flex justify-center gap-6">
            <motion.a
              href="mailto:internationalinvestmentcompens@gmail.com"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              📧 Email Support
            </motion.a>
            <motion.a
              href="https://t.me/JamesRace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              💬 @JamesRace
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-6 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Secure • Fast • Reliable
        </motion.p>

        {/* Live stats ticker */}
        <motion.div
          className="mt-8 overflow-hidden rounded-2xl bg-secondary/20 border border-primary/10 backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="flex items-center gap-12 py-4 px-6 text-sm text-muted-foreground whitespace-nowrap"
            animate={{ x: [0, -600] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <span className="flex items-center gap-2">
              <motion.span 
                className="w-2 h-2 rounded-full bg-success"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              BTC $97,234.56 <span className="text-success font-medium">+2.4%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span 
                className="w-2 h-2 rounded-full bg-success"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              ETH $3,612.89 <span className="text-success font-medium">+1.8%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span 
                className="w-2 h-2 rounded-full bg-destructive"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              SOL $189.45 <span className="text-destructive font-medium">-0.5%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span 
                className="w-2 h-2 rounded-full bg-success"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
              BNB $612.34 <span className="text-success font-medium">+3.1%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span 
                className="w-2 h-2 rounded-full bg-success"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              BTC $97,234.56 <span className="text-success font-medium">+2.4%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span 
                className="w-2 h-2 rounded-full bg-success"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              ETH $3,612.89 <span className="text-success font-medium">+1.8%</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
