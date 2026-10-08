import React from 'react';
import { motion } from 'motion/react';
import { ButterflyTree3D } from '../Canvas3D/ButterflyTree3D';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { soundEngine } from '../../utils/audio';
import { CHILDHOOD_PHOTO_BASE64, CHILDHOOD_PHOTO_URL } from '../../assets/imageData';

interface Page2Props {
  onNext: () => void;
}

export const Page2HeroTree: React.FC<Page2Props> = ({ onNext }) => {
  // Line sections designed to prevent word breaks on mobile devices
  const lineSections = [
    {
      words: ["HAPPY", "BIRTHDAY"],
      delay: 0.2,
      color: "from-pink-200 via-amber-200 to-rose-200",
    },
    {
      words: ["MY", "DEAR"],
      delay: 0.4,
      color: "from-amber-200 via-purple-200 to-pink-200",
    },
    {
      words: ["PANI", "THIRU", "MOZHI"],
      delay: 0.6,
      color: "from-amber-300 via-pink-300 to-purple-300",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1E0927] via-[#140722] to-[#0A0314] text-pink-100 overflow-x-hidden select-none px-4 sm:px-6 py-8 sm:py-12">
      {/* Background Lighting Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-600/20 via-purple-900/25 to-transparent pointer-events-none" />

      {/* Floating Sparkles in Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-sparkle"
            style={{
              left: `${(i * 21) % 100}%`,
              top: `${(i * 27) % 100}%`,
              width: `${2 + (i % 3) * 2}px`,
              height: `${2 + (i % 3) * 2}px`,
              backgroundColor: '#FFD166',
              boxShadow: '0 0 8px #FFD166',
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* 1. TOP: RADIANT CIRCULAR PORTRAIT PHOTO (ENLARGED) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center mb-6 sm:mb-8"
      >
        {/* Large Circular Avatar Container with Royal Golden Border */}
        <div className="relative">
          {/* Animated Glowing Ring Backdrop */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 rounded-full blur-lg opacity-60 animate-pulse" />

          {/* Ornate Gold Border Frame - Significantly Increased Size */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-1.5 sm:p-2 bg-gradient-to-br from-[#FFF0D0] via-[#D4AF37] to-[#8C6D1F] shadow-[0_15px_40px_rgba(0,0,0,0.85)] border-2 sm:border-3 border-amber-200/90 overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative shadow-inner flex items-center justify-center">
              <img
                src={CHILDHOOD_PHOTO_BASE64}
                alt={BIRTHDAY_CONFIG.recipient.name}
                loading="eager"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== CHILDHOOD_PHOTO_URL) {
                    target.src = CHILDHOOD_PHOTO_URL;
                  }
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. DOWNSIDE: BIRTHDAY WISHES TYPOGRAPHY */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-2 mb-4">
        <div className="space-y-1 sm:space-y-2 flex flex-col items-center">
          {lineSections.map((line, lIdx) => (
            <div
              key={lIdx}
              className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3.5 gap-y-0.5"
            >
              {line.words.map((word, wIdx) => (
                // whitespace-nowrap prevents words like MOZHI from splitting mid-word
                <span
                  key={wIdx}
                  className="inline-flex whitespace-nowrap"
                  style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
                >
                  {word.split("").map((char, cIdx) => (
                    <motion.span
                      key={cIdx}
                      initial={{ opacity: 0, y: 20, rotateX: -60 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: line.delay + wIdx * 0.12 + cIdx * 0.03,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className={`inline-block font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${line.color} drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Heartfelt Subtitle Wish */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-3 text-xs sm:text-sm md:text-base text-pink-200/90 font-light max-w-lg leading-relaxed"
        >
          Wishing the brightest star a memorable birthday filled with pure happiness, magical moments, and endless love 🌸
        </motion.p>
      </div>

      {/* 3. DOWNSIDE: INTERACTIVE 3D BUTTERFLY TREE */}
      <div className="relative z-10 w-full max-w-2xl h-[380px] sm:h-[460px] md:h-[500px] my-4">
        <ButterflyTree3D />

        {/* Interactive Instruction Hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full text-[11px] sm:text-xs text-pink-200/90 flex items-center gap-2 pointer-events-none whitespace-nowrap shadow-lg border border-amber-300/30">
          <span className="animate-bounce text-amber-300 font-bold">↓</span>
          <span>Scroll down to release all butterflies</span>
          <span className="animate-pulse text-pink-300">🦋✨</span>
        </div>
      </div>

      {/* 4. BOTTOM ACTION BUTTON */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="relative z-10 mt-3 sm:mt-4 pb-6"
      >
        <button
          onClick={() => {
            soundEngine.playMagicChime();
            onNext();
          }}
          className="group px-7 sm:px-8 py-3 sm:py-3.5 rounded-full glass-panel-gold font-display font-semibold text-sm sm:text-base text-amber-200 hover:text-slate-900 hover:bg-amber-300 shadow-[0_0_25px_rgba(255,209,102,0.4)] hover:shadow-[0_0_40px_rgba(255,209,102,0.8)] transition-all duration-300 border border-amber-300/40 flex items-center gap-3 cursor-pointer active:scale-95"
        >
          <span>Celebrate With Cake</span>
          <span className="text-xl group-hover:scale-110 transition-transform">🎂</span>
        </button>
      </motion.div>
    </div>
  );
};
