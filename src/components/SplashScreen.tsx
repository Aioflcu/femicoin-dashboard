import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface SplashScreenProps {
  onComplete: () => void;
}

// Floating particle with hover-like continuous motion
const FloatingParticle: React.FC<{ 
  delay: number; 
  size: number; 
  x: number; 
  y: number;
  duration: number;
}> = ({ delay, size, x, y, duration }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ 
      width: size, 
      height: size, 
      left: `${x}%`, 
      top: `${y}%`,
      background: `radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.2) 70%, transparent 100%)`,
      boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0.4, 0.8, 0],
      scale: [0, 1.2, 0.8, 1.2, 0],
      x: [0, 20, -20, 10, -30],
      y: [0, -40, -20, -60, -100],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Orbiting ring around logo
const OrbitingRing: React.FC<{ size: number; duration: number; delay: number; reverse?: boolean }> = ({ 
  size, duration, delay, reverse 
}) => (
  <motion.div
    className="absolute border border-primary/30 rounded-full"
    style={{ 
      width: size, 
      height: size,
      boxShadow: '0 0 20px hsl(var(--primary) / 0.2)',
    }}
    animate={{ 
      rotate: reverse ? -360 : 360,
      scale: [1, 1.05, 1],
    }}
    transition={{ 
      rotate: { duration, repeat: Infinity, ease: 'linear' },
      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      delay,
    }}
  />
);

// Glowing orb with pulsing effect
const GlowingOrb: React.FC = () => (
  <motion.div
    className="absolute w-80 h-80 rounded-full"
    style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, hsl(var(--primary) / 0.2) 30%, hsl(var(--primary) / 0.05) 60%, transparent 80%)',
      filter: 'blur(60px)',
    }}
    animate={{
      scale: [1, 1.3, 1.1, 1.4, 1],
      opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Secondary smaller orb
const SecondaryOrb: React.FC<{ position: 'left' | 'right' }> = ({ position }) => (
  <motion.div
    className="absolute w-32 h-32 rounded-full"
    style={{
      [position]: '-10%',
      top: '30%',
      background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)`,
      filter: 'blur(40px)',
    }}
    animate={{
      x: position === 'left' ? [0, 30, 0] : [0, -30, 0],
      y: [0, -20, 20, 0],
      scale: [1, 1.2, 0.9, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Moving grid lines for background
const GridLine: React.FC<{ isVertical: boolean; position: number; delay: number }> = ({ 
  isVertical, position, delay 
}) => (
  <motion.div
    className="absolute bg-primary/10"
    style={{
      [isVertical ? 'left' : 'top']: `${position}%`,
      [isVertical ? 'width' : 'height']: '1px',
      [isVertical ? 'height' : 'width']: '100%',
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.3, 0.1, 0.3, 0],
      scale: [0.5, 1, 1, 1, 0.5],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Shooting star effect
const ShootingStar: React.FC<{ delay: number; startX: number; startY: number }> = ({ 
  delay, startX, startY 
}) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary rounded-full"
    style={{
      left: `${startX}%`,
      top: `${startY}%`,
      boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)',
    }}
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      x: [0, 150, 300],
      y: [0, 100, 200],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'easeOut',
    }}
  />
);

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Handle mouse movement for hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  // Generate particles
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    size: Math.random() * 8 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 3,
  })), []);

  // Generate grid lines
  const gridLines = useMemo(() => [
    ...Array.from({ length: 8 }, (_, i) => ({ id: `v${i}`, isVertical: true, position: (i + 1) * 12, delay: i * 0.2 })),
    ...Array.from({ length: 6 }, (_, i) => ({ id: `h${i}`, isVertical: false, position: (i + 1) * 15, delay: i * 0.3 })),
  ], []);

  // Generate shooting stars
  const shootingStars = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 2,
    startX: Math.random() * 30,
    startY: Math.random() * 30,
  })), []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.5,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Dynamic gradient background that follows mouse */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15) 0%, transparent 50%)`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Grid lines background */}
          <div className="absolute inset-0 overflow-hidden">
            {gridLines.map((line) => (
              <GridLine
                key={line.id}
                isVertical={line.isVertical}
                position={line.position}
                delay={line.delay}
              />
            ))}
          </div>

          {/* Shooting stars */}
          <div className="absolute inset-0 overflow-hidden">
            {shootingStars.map((star) => (
              <ShootingStar
                key={star.id}
                delay={star.delay}
                startX={star.startX}
                startY={star.startY}
              />
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <FloatingParticle
                key={particle.id}
                delay={particle.delay}
                size={particle.size}
                x={particle.x}
                y={particle.y}
                duration={particle.duration}
              />
            ))}
          </div>

          {/* Secondary orbs */}
          <SecondaryOrb position="left" />
          <SecondaryOrb position="right" />

          {/* Main glowing orb */}
          <div className="absolute flex items-center justify-center">
            <GlowingOrb />
          </div>

          {/* Orbiting rings */}
          <div className="absolute flex items-center justify-center">
            <OrbitingRing size={200} duration={8} delay={0} />
            <OrbitingRing size={280} duration={12} delay={0.5} reverse />
            <OrbitingRing size={360} duration={15} delay={1} />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo with enhanced effects */}
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                delay: 0.2,
              }}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              {/* Multiple shimmer layers */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 50%, transparent 100%)',
                }}
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(45deg, transparent 0%, hsl(var(--primary) / 0.2) 50%, transparent 100%)',
                }}
                animate={{
                  x: ['200%', '-200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.5,
                }}
              />

              {/* Logo container with enhanced pulse and glow */}
              <motion.div
                className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 rounded-3xl shadow-2xl cursor-pointer"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)',
                    '0 0 60px hsl(var(--primary) / 0.6), 0 0 120px hsl(var(--primary) / 0.3)',
                    '0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)',
                  ],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 0 80px hsl(var(--primary) / 0.8), 0 0 160px hsl(var(--primary) / 0.4)',
                }}
              >
                <motion.span 
                  className="text-6xl font-bold text-primary-foreground font-display"
                  animate={{
                    textShadow: [
                      '0 0 10px hsl(var(--primary-foreground) / 0.5)',
                      '0 0 30px hsl(var(--primary-foreground) / 0.8)',
                      '0 0 10px hsl(var(--primary-foreground) / 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  W
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Company name with typing effect */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.h1 
                className="text-2xl font-bold text-foreground font-display tracking-widest"
                animate={{
                  textShadow: [
                    '0 0 10px hsl(var(--primary) / 0.3)',
                    '0 0 20px hsl(var(--primary) / 0.5)',
                    '0 0 10px hsl(var(--primary) / 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.05,
                  color: 'hsl(var(--primary))',
                }}
              >
                WICN
              </motion.h1>
              <motion.p 
                className="text-sm text-muted-foreground mt-2 tracking-[0.3em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                WORLDWIDE INVESTMENT
              </motion.p>
              <motion.p 
                className="text-xs text-muted-foreground/70 tracking-[0.2em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                COMPENSATION NETWORK
              </motion.p>
            </motion.div>

            {/* Enhanced progress bar */}
            <motion.div
              className="w-56"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <Progress
                  value={progress}
                  className="h-1.5 bg-muted/30"
                />
                {/* Glow effect on progress */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5) ${progress}%, transparent)`,
                    filter: 'blur(4px)',
                  }}
                />
              </motion.div>
              <motion.p
                className="text-center text-xs text-muted-foreground mt-3 font-medium"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  letterSpacing: ['0.1em', '0.2em', '0.1em'],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress < 100 ? 'INITIALIZING...' : 'COMPLETE'}
              </motion.p>
              <motion.p
                className="text-center text-xs text-primary mt-1 font-bold"
                animate={{
                  textShadow: [
                    '0 0 5px hsl(var(--primary) / 0.5)',
                    '0 0 15px hsl(var(--primary) / 0.8)',
                    '0 0 5px hsl(var(--primary) / 0.5)',
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
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
