import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { soundEngine } from '../../utils/audio';

interface Page1Props {
  onNext: () => void;
}

export const Page1Intro: React.FC<Page1Props> = ({ onNext }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [butterflyLanded, setButterflyLanded] = useState(false);

  // Pre-calculate particles once to prevent inline re-creation on renders
  const ambientParticles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 19) % 100}%`,
      top: `${(i * 29) % 100}%`,
      size: 3 + (i % 4) * 2,
      color: BIRTHDAY_CONFIG.butterflyColors[i % BIRTHDAY_CONFIG.butterflyColors.length],
      delay: `${(i * 0.3) % 3}s`,
    }));
  }, []);

  const handleStart = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    soundEngine.playMagicChime();
    setButterflyLanded(true);

    // Fast, responsive 750ms transition
    setTimeout(() => {
      onNext();
    }, 750);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#3D183B] via-[#2A1032] to-[#120722] text-pink-100 select-none px-4 sm:px-6">
      {/* Soft Pink Fantasy Sky Ambient Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-purple-900/30 to-transparent pointer-events-none" />

      {/* Moving Soft Fantasy Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-10 -left-20 w-80 h-36 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-48 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      {/* Floating Glowing Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {ambientParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-sparkle"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-xl w-full px-4 text-center flex flex-col items-center">
        {/* Large Elegant Heading "Hey!" */}
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-script text-7xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-amber-200 to-purple-200 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        >
          Hey!
        </motion.h1>

        {/* Subtitle Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-4 font-display text-base sm:text-2xl text-pink-100/90 font-light tracking-wide max-w-md leading-relaxed"
        >
          {BIRTHDAY_CONFIG.recipient.surpriseMessage}
        </motion.p>

        {/* Glowing Premium Button: Begin the Journey */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="relative mt-10 sm:mt-12"
        >
          <button
            onClick={handleStart}
            disabled={isTransitioning}
            className={`relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-display font-semibold text-base sm:text-lg text-slate-900 shadow-[0_0_30px_rgba(255,209,102,0.6)] transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 ${
              isTransitioning
                ? 'scale-105 bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300'
                : 'bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:scale-105 hover:shadow-[0_0_45px_rgba(255,209,102,0.85)]'
            }`}
          >
            {/* Button Inner Shimmer */}
            <span className="absolute inset-0 bg-white/30 group-hover:translate-x-full transition-transform duration-700 ease-in-out -translate-x-full" />

            <span className="relative z-10 flex items-center gap-3">
              <span>Begin the Journey</span>
              <span className="text-xl group-hover:rotate-12 transition-transform">🦋</span>
            </span>
          </button>

          {/* Butterfly Landing on Button when clicked */}
          <AnimatePresence>
            {butterflyLanded && (
              <motion.div
                initial={{ scale: 0, x: 50, y: -50, opacity: 0 }}
                animate={{ scale: [1, 2, 4], x: 0, y: 0, opacity: [1, 1, 0] }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute -top-6 -right-6 pointer-events-none z-20 text-4xl drop-shadow-[0_0_15px_#FFD166]"
              >
                🦋
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
