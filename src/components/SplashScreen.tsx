import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const FloatingParticle: React.FC<{ delay: number; size: number; x: number; y: number; duration: number }> = ({ delay, size, x, y, duration }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size, height: size, left: `${x}%`, top: `${y}%`,
      background: `radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.2) 70%, transparent 100%)`,
      boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.8, 0.4, 0.8, 0], scale: [0, 1.2, 0.8, 1.2, 0], x: [0, 20, -20, 10, -30], y: [0, -40, -20, -60, -100] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const OrbitingRing: React.FC<{ size: number; duration: number; delay: number; reverse?: boolean }> = ({ size, duration, delay, reverse }) => (
  <motion.div
    className="absolute border border-primary/20 rounded-full"
    style={{ width: size, height: size, boxShadow: '0 0 15px hsl(var(--primary) / 0.15)' }}
    animate={{ rotate: reverse ? -360 : 360, scale: [1, 1.05, 1] }}
    transition={{ rotate: { duration, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }, delay }}
  />
);

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const increment = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) { clearInterval(timer); setTimeout(() => setIsExiting(true), 200); return 100; }
        return newProgress;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isExiting) { const timer = setTimeout(onComplete, 600); return () => clearTimeout(timer); }
  }, [isExiting, onComplete]);

  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i, delay: Math.random() * 3, size: Math.random() * 6 + 2, x: Math.random() * 100, y: Math.random() * 100, duration: Math.random() * 3 + 3,
  })), []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5 }} transition={{ duration: 0.6 }}>
          {/* Neon background glow */}
          <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 60%)' }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />

          {/* Grid */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 100%)',
          }} />

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((p) => <FloatingParticle key={p.id} {...p} />)}
          </div>

          {/* Rings */}
          <div className="absolute flex items-center justify-center">
            <OrbitingRing size={180} duration={8} delay={0} />
            <OrbitingRing size={260} duration={12} delay={0.5} reverse />
            <OrbitingRing size={340} duration={15} delay={1} />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-8">
            <motion.div className="relative" initial={{ scale: 0, opacity: 0, rotateY: -180 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.2 }}>
              <motion.div
                className="relative bg-gradient-to-br from-primary via-accent to-primary p-8 rounded-3xl shadow-2xl"
                animate={{
                  boxShadow: ['0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)', '0 0 60px hsl(var(--primary) / 0.6), 0 0 120px hsl(var(--primary) / 0.3)', '0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)'],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity className="w-14 h-14 text-primary-foreground" />
              </motion.div>
            </motion.div>

            <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <motion.h1
                className="text-3xl font-bold text-foreground font-display tracking-[0.2em] neon-text"
                animate={{ textShadow: ['0 0 10px hsl(var(--primary) / 0.3)', '0 0 25px hsl(var(--primary) / 0.6)', '0 0 10px hsl(var(--primary) / 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                GAIN-VESTOR
              </motion.h1>
              <motion.p className="text-sm text-muted-foreground mt-2 tracking-[0.3em] font-mono-code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                SMART CRYPTO PORTFOLIO
              </motion.p>
            </motion.div>

            <motion.div className="w-56" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Progress value={progress} className="h-1.5 bg-muted/30" />
              <motion.p className="text-center text-xs text-muted-foreground mt-3 font-medium font-mono-code" animate={{ opacity: [0.5, 1, 0.5], letterSpacing: ['0.1em', '0.2em', '0.1em'] }} transition={{ duration: 1.5, repeat: Infinity }}>
                {progress < 100 ? 'INITIALIZING...' : 'COMPLETE'}
              </motion.p>
              <motion.p className="text-center text-xs text-primary mt-1 font-bold font-mono-code neon-text" animate={{ textShadow: ['0 0 5px hsl(var(--primary) / 0.5)', '0 0 15px hsl(var(--primary) / 0.8)', '0 0 5px hsl(var(--primary) / 0.5)'] }} transition={{ duration: 1, repeat: Infinity }}>
                {Math.round(progress)}%
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
