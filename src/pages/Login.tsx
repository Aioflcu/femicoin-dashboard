import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, User, Shield, TrendingUp, Globe, Zap, Activity } from 'lucide-react';
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
  const backgroundX = useTransform(smoothX, [0, window.innerWidth], [-30, 30]);
  const backgroundY = useTransform(smoothY, [0, window.innerHeight], [-30, 30]);

  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 400);
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
        toast({ title: "Welcome, Admin!", description: "Accessing admin panel" });
        navigate('/admin');
      } else {
        toast({ title: "Welcome back!", description: "Logged in to GAIN-VESTOR" });
        navigate('/dashboard');
      }
    } else {
      toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const features = [
    { icon: Shield, label: 'Bank-Grade Security', delay: 0.5 },
    { icon: TrendingUp, label: 'Live Market Data', delay: 0.6 },
    { icon: Globe, label: 'Global Coverage', delay: 0.7 },
    { icon: Zap, label: 'Instant Execution', delay: 0.8 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Deep dark background with neon grid */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 20%, hsl(160 100% 45% / 0.08) 0%, transparent 60%)',
              'radial-gradient(ellipse at 70% 80%, hsl(185 100% 50% / 0.08) 0%, transparent 60%)',
              'radial-gradient(ellipse at 30% 20%, hsl(160 100% 45% / 0.08) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Moving neon aurora */}
        <motion.div style={{ x: backgroundX, y: backgroundY }}>
          <motion.div
            className="absolute top-0 left-1/4 w-[700px] h-[350px] rounded-full blur-[120px]"
            animate={{
              background: [
                'linear-gradient(180deg, hsl(160 100% 45% / 0.2) 0%, transparent 100%)',
                'linear-gradient(180deg, hsl(185 100% 50% / 0.15) 0%, transparent 100%)',
                'linear-gradient(180deg, hsl(160 100% 45% / 0.2) 0%, transparent 100%)',
              ],
              y: [0, 40, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[500px] h-[250px] rounded-full blur-[100px]"
            animate={{
              background: [
                'linear-gradient(0deg, hsl(185 100% 50% / 0.15) 0%, transparent 100%)',
                'linear-gradient(0deg, hsl(160 100% 45% / 0.2) 0%, transparent 100%)',
                'linear-gradient(0deg, hsl(185 100% 50% / 0.15) 0%, transparent 100%)',
              ],
              y: [0, -25, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Neon grid */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(hsl(160 100% 45% / 0.15) 1px, transparent 1px),
              linear-gradient(90deg, hsl(160 100% 45% / 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        {/* Floating neon particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: i % 2 === 0 ? 'hsl(160 100% 45%)' : 'hsl(185 100% 50%)' }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{ y: [null, Math.random() * -400 - 100], opacity: [0, 1, 0] }}
            transition={{ duration: 4 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 4, ease: 'linear' }}
          />
        ))}

        {/* Scan lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 50%, hsl(160 100% 45% / 0.015) 50%)',
            backgroundSize: '100% 4px',
          }}
          animate={{ y: [0, 4] }}
          transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <AnimatePresence>
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div className="inline-flex items-center gap-3 mb-4" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 20px hsl(160 100% 45% / 0.4)',
                    '0 0 50px hsl(160 100% 45% / 0.6)',
                    '0 0 20px hsl(160 100% 45% / 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity className="w-10 h-10 text-primary-foreground relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient leading-tight tracking-wider">
                GAIN-VESTOR
              </h1>
            </motion.div>

            <motion.p className="text-muted-foreground mt-3 text-base tracking-widest uppercase font-mono-code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Smart Crypto Portfolio
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Feature badges */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {features.map((f) => (
            <motion.div
              key={f.label}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary/30 border border-primary/20 text-xs text-muted-foreground backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: f.delay, type: 'spring', stiffness: 200 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'hsl(160 100% 45% / 0.15)',
                borderColor: 'hsl(160 100% 45% / 0.5)',
                boxShadow: '0 0 20px hsl(160 100% 45% / 0.3)',
              }}
            >
              <f.icon className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">{f.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Card */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              className="glass-card rounded-2xl p-8 shadow-2xl relative overflow-hidden border border-primary/15"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top neon line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(160 100% 45% / 0.8), hsl(185 100% 50% / 0.8), transparent)' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.h2
                className="text-xl font-display font-semibold mb-6 text-center neon-text"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                SIGN IN
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <label className="text-sm font-medium text-muted-foreground tracking-wide">USERNAME</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-12 h-12 bg-secondary/40 focus:ring-2 focus:ring-primary/40 focus:border-primary/50 font-mono-code"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <label className="text-sm font-medium text-muted-foreground tracking-wide">PASSWORD</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 bg-secondary/40 focus:ring-2 focus:ring-primary/40 focus:border-primary/50 font-mono-code"
                      required
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="xl"
                    className="w-full mt-4 h-14 text-lg relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-bold tracking-wider neon-glow"
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
                        <span className="relative z-10">SIGN IN</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.p className="text-center text-sm text-muted-foreground mt-6 font-mono-code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                Welcome, Bryan Voth
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support */}
        <motion.div className="mt-8 text-center space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <p className="text-sm text-muted-foreground">Need help? Contact Support</p>
          <div className="flex justify-center gap-6">
            <motion.a href="mailto:internationalinvestmentcompens@gmail.com" className="text-sm text-primary hover:text-primary/80 flex items-center gap-2" whileHover={{ scale: 1.05, y: -2 }}>
              📧 Email
            </motion.a>
            <motion.a href="https://t.me/JamesRace" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80 flex items-center gap-2" whileHover={{ scale: 1.05, y: -2 }}>
              💬 @JamesRace
            </motion.a>
          </div>
        </motion.div>

        <motion.p className="text-center text-xs text-muted-foreground mt-6 tracking-[0.3em] uppercase font-mono-code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          Secure • Fast • Reliable
        </motion.p>

        {/* Ticker */}
        <motion.div className="mt-8 overflow-hidden rounded-xl bg-secondary/20 border border-primary/10 backdrop-blur-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <motion.div className="flex items-center gap-12 py-3 px-6 text-sm text-muted-foreground whitespace-nowrap font-mono-code" animate={{ x: [0, -600] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
            <span className="flex items-center gap-2">
              <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }} />
              BTC $97,234.56 <span className="text-success font-medium">+2.4%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
              ETH $3,612.89 <span className="text-success font-medium">+1.8%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span className="w-2 h-2 rounded-full bg-destructive" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
              SOL $189.45 <span className="text-destructive font-medium">-0.5%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
              BNB $612.34 <span className="text-success font-medium">+3.1%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }} />
              BTC $97,234.56 <span className="text-success font-medium">+2.4%</span>
            </span>
            <span className="flex items-center gap-2">
              <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
              ETH $3,612.89 <span className="text-success font-medium">+1.8%</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
