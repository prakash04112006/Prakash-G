import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../utils/audio';

interface CocoonLoaderProps {
  onComplete: () => void;
}

export const CocoonLoader: React.FC<CocoonLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'hanging' | 'glowing' | 'opening' | 'emerging' | 'flying'>('hanging');
  const [progress, setProgress] = useState(0);

  // Auto progression of cocoon transformation
  useEffect(() => {
    const timer1 = setTimeout(() => setStage('glowing'), 1200);
    const timer2 = setTimeout(() => {
      setStage('opening');
      soundEngine.playMagicChime();
    }, 3200);
    const timer3 = setTimeout(() => setStage('emerging'), 5200);
    const timer4 = setTimeout(() => {
      setStage('flying');
      soundEngine.playSparkle();
    }, 7000);
    const timer5 = setTimeout(() => onComplete(), 8800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  // Loading progress percentage counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleQuickStart = () => {
    soundEngine.playMagicChime();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#110720] via-[#1D0C33] to-[#0A0518] text-pink-100 overflow-hidden select-none">
      {/* Background Star Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950/80 to-black pointer-events-none" />

      {/* Floating Wind Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200 animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              opacity: 0.3 + Math.random() * 0.7,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Tree Branch with Swaying Motion */}
      <div className="relative w-full max-w-lg h-96 flex flex-col items-center justify-start">
        {/* Branch SVG */}
        <motion.svg
          viewBox="0 0 400 120"
          className="w-80 sm:w-96 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]Origin-top"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Main Wooden Branch */}
          <path
            d="M 10 30 C 100 20, 200 45, 390 25 M 150 35 C 180 60, 220 50, 250 80"
            stroke="#4A2E1B"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 10 30 C 100 20, 200 45, 390 25"
            stroke="#6B442A"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaves on branch */}
          <path d="M 80 20 Q 90 5, 100 20 Q 90 35, 80 20 Z" fill="#2E5A36" />
          <path d="M 280 28 Q 295 10, 310 28 Q 295 45, 280 28 Z" fill="#3D7347" />
          <path d="M 340 22 Q 355 5, 370 22 Q 355 40, 340 22 Z" fill="#2E5A36" />

          {/* Hanging Silk Thread */}
          <line x1="200" y1="38" x2="200" y2="90" stroke="#FFD166" strokeWidth="2" opacity="0.8" />
        </motion.svg>

        {/* Hanging Cocoon */}
        <div className="relative -mt-10 flex flex-col items-center">
          {stage !== 'flying' && (
            <motion.div
              className="relative cursor-pointer"
              animate={{
                rotate: stage === 'opening' ? [-4, 4, -4] : [-1.5, 1.5, -1.5],
                scale: stage === 'glowing' || stage === 'opening' ? [1, 1.08, 1] : 1,
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              onClick={handleQuickStart}
            >
              {/* Cocoon Outer Silk Glow */}
              <div
                className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${
                  stage === 'glowing' || stage === 'opening'
                    ? 'bg-gradient-to-tr from-pink-400 via-purple-300 to-amber-300 opacity-90 scale-125 animate-pulse'
                    : 'bg-amber-200/30 opacity-40'
                }`}
              />

              {/* Cocoon SVG Illustration */}
              <svg viewBox="0 0 100 140" className="w-24 h-32 sm:w-28 sm:h-36 drop-shadow-2xl">
                <defs>
                  <radialGradient id="cocoonGrad" cx="40%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFF1F2" />
                    <stop offset="40%" stopColor="#FCE4EC" />
                    <stop offset="70%" stopColor="#E9D5FF" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </radialGradient>
                </defs>

                {/* Cocoon Shell */}
                <path
                  d="M 50 10 C 20 10, 10 50, 10 85 C 10 120, 35 135, 50 135 C 65 135, 90 120, 90 85 C 90 50, 80 10, 50 10 Z"
                  fill="url(#cocoonGrad)"
                  stroke="#FFD166"
                  strokeWidth="1.5"
                />

                {/* Silk Texture Threads */}
                <path d="M 25 40 Q 50 60, 75 40" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M 20 70 Q 50 95, 80 70" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M 30 100 Q 50 120, 70 100" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.6" />

                {/* Opening Cracks when hatching */}
                {(stage === 'opening' || stage === 'emerging') && (
                  <motion.path
                    d="M 50 20 L 45 50 L 55 80 L 48 110"
                    stroke="#FFD166"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                )}
              </svg>
            </motion.div>
          )}

          {/* Emerging & Flying Butterfly */}
          {(stage === 'emerging' || stage === 'flying') && (
            <motion.div
              className="absolute top-10 flex flex-col items-center pointer-events-none"
              initial={{ scale: 0.2, y: 0, opacity: 0 }}
              animate={
                stage === 'flying'
                  ? { scale: [1, 4, 12], y: [0, -100, -300], zIndex: 100, opacity: [1, 1, 0] }
                  : { scale: 1, y: -20, opacity: 1 }
              }
              transition={{ duration: stage === 'flying' ? 2 : 1.5, ease: 'easeInOut' }}
            >
              <div className="relative w-28 h-28 flex items-center justify-center animate-flutter">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_#FFD166]">
                  {/* Left Main Wing */}
                  <path
                    d="M 50 50 C 10 0, -10 30, 5 70 C 20 90, 45 70, 50 50 Z"
                    fill="url(#wingGrad1)"
                  />
                  {/* Right Main Wing */}
                  <path
                    d="M 50 50 C 90 0, 110 30, 95 70 C 80 90, 55 70, 50 50 Z"
                    fill="url(#wingGrad2)"
                  />
                  {/* Wing Gradients */}
                  <defs>
                    <linearGradient id="wingGrad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFD166" />
                      <stop offset="50%" stopColor="#F472B6" />
                      <stop offset="100%" stopColor="#D8B4FE" />
                    </linearGradient>
                    <linearGradient id="wingGrad2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD166" />
                      <stop offset="50%" stopColor="#F472B6" />
                      <stop offset="100%" stopColor="#D8B4FE" />
                    </linearGradient>
                  </defs>
                  {/* Butterfly Body */}
                  <ellipse cx="50" cy="50" rx="3" ry="16" fill="#FFFFFF" />
                  <path d="M 50 34 Q 42 20, 38 10" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                  <path d="M 50 34 Q 58 20, 62 10" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Loading Status Text */}
      <div className="mt-8 text-center px-4 max-w-sm">
        <p className="font-display font-medium text-lg sm:text-xl text-pink-200 tracking-wide animate-pulse">
          {stage === 'hanging' && 'A sweet journey is waking up...'}
          {stage === 'glowing' && 'A cocoon glows in the fantasy garden...'}
          {stage === 'opening' && 'The cocoon is gently opening...'}
          {stage === 'emerging' && 'A golden butterfly emerges!'}
          {stage === 'flying' && 'Welcome to the magical journey!'}
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mt-4 h-1.5 glass-panel rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-mono text-pink-300/70">{progress}%</p>

        {/* Skip / Enter Button */}
        <button
          onClick={handleQuickStart}
          className="mt-6 px-6 py-2 rounded-full glass-panel-gold text-amber-200 text-xs sm:text-sm font-semibold hover:bg-amber-400/20 transition-all border border-amber-300/40 shadow-lg cursor-pointer active:scale-95"
        >
          Enter Instantly 🌸
        </button>
      </div>
    </div>
  );
};
