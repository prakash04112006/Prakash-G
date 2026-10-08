import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/audio';
import { Flame, RefreshCw, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';

interface Page6Props {
  onNext: () => void;
}

export const Page6CakeCelebration: React.FC<Page6Props> = ({ onNext }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [celebrationCount, setCelebrationCount] = useState(0);

  // Trigger grand fireworks and confetti explosion
  const handleCakeClick = () => {
    soundEngine.playFirework();
    soundEngine.playMagicChime();
    setCelebrationCount((prev) => prev + 1);

    // Confetti burst from multiple directions
    const count = 200;
    const defaults = { origin: { y: 0.65 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 35,
      startVelocity: 55,
      colors: BIRTHDAY_CONFIG.butterflyColors,
    });
    fire(0.2, {
      spread: 70,
      colors: ['#FFD166', '#FF9EAA', '#D8B4FE', '#FFFFFF', '#F59E0B'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
    });
    fire(0.2, {
      spread: 120,
      startVelocity: 35,
      decay: 0.92,
      scalar: 1.4,
    });
  };

  const toggleCandles = () => {
    if (candlesLit) {
      soundEngine.playBreeze();
      setCandlesLit(false);
    } else {
      soundEngine.playSparkle();
      setCandlesLit(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#2B0D33] via-[#1E0927] to-[#110318] text-pink-100 overflow-hidden select-none px-4 sm:px-6 py-8 sm:py-10">
      {/* Background Celebration Sparkles & Radial Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/25 via-purple-900/35 to-transparent pointer-events-none" />

      {/* Floating Sparkles in Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-sparkle"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: `${2 + (i % 3) * 2}px`,
              height: `${2 + (i % 3) * 2}px`,
              backgroundColor: '#FFD166',
              boxShadow: '0 0 10px #FFD166',
              animationDelay: `${(i * 0.3) % 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header Info */}
      <div className="relative z-10 text-center max-w-xl pt-2 sm:pt-4">
        <h2 className="font-display font-extrabold text-3xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 drop-shadow-[0_4px_20px_rgba(255,209,102,0.4)]">
          Make A Wish!
        </h2>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-pink-200/90 font-light">
          Tap the cake to fire grand fireworks, or blow out the candles!
        </p>
      </div>

      {/* LUXURY 3D TIERED BIRTHDAY CAKE DISPLAY */}
      <div className="relative z-10 my-4 sm:my-6 flex flex-col items-center max-w-full overflow-hidden">
        {/* Dynamic Candle Light Backlight Glow */}
        <AnimatePresence>
          {candlesLit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.6, 0.9, 0.7], scale: [1, 1.15, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCakeClick}
          className="relative cursor-pointer flex flex-col items-center group py-2 sm:py-4 z-10 scale-90 sm:scale-100 origin-center"
        >
          {/* Golden Crown on Top Tier */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="z-20 -mb-2 flex flex-col items-center drop-shadow-[0_0_20px_rgba(255,209,102,0.9)]"
          >
            <span className="text-3xl sm:text-4xl">👑</span>
          </motion.div>

          {/* 5 Elegant Gold-Striped Candle Flames */}
          <div className="flex gap-4 sm:gap-7 mb-[-10px] z-20">
            {Array.from({ length: 5 }).map((_, cIdx) => (
              <div key={cIdx} className="flex flex-col items-center">
                {/* Flame */}
                <AnimatePresence>
                  {candlesLit ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [1, 1.25, 0.95, 1.15],
                        opacity: [0.9, 1, 0.85, 1],
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5 + cIdx * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Ambient Flame Aura */}
                      <div className="absolute w-7 sm:w-8 h-9 sm:h-10 rounded-full bg-amber-400/40 blur-md animate-pulse" />
                      {/* Core Flame */}
                      <div className="w-3.5 sm:w-4 h-7 sm:h-8 rounded-full bg-gradient-to-t from-amber-600 via-yellow-300 to-white shadow-[0_0_25px_#FFD166]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -12 }}
                      transition={{ duration: 1 }}
                      className="text-xs text-slate-300 font-mono"
                    >
                      💨
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Candle Stick */}
                <div className="w-3 sm:w-3.5 h-8 sm:h-10 bg-gradient-to-b from-amber-100 via-pink-200 to-amber-300 rounded-sm border border-amber-300/80 shadow-md flex flex-col items-center justify-between py-1">
                  <div className="w-full h-0.5 bg-amber-400/60" />
                  <div className="w-full h-0.5 bg-amber-400/60" />
                </div>
              </div>
            ))}
          </div>

          {/* TOP TIER (1st Tier) */}
          <div className="w-48 sm:w-60 h-20 sm:h-22 bg-gradient-to-r from-pink-300 via-rose-200 to-amber-100 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-2 border-amber-200 flex flex-col items-center justify-center relative overflow-hidden z-10">
            {/* Scalloped Dripping Frosting */}
            <svg viewBox="0 0 240 30" className="absolute top-0 left-0 right-0 w-full h-6 fill-white/80 drop-shadow-sm">
              <path d="M 0 0 L 0 15 Q 15 30 30 15 Q 45 0 60 15 Q 75 30 90 15 Q 105 0 120 15 Q 135 30 150 15 Q 165 0 180 15 Q 195 30 210 15 Q 225 0 240 15 L 240 0 Z" />
            </svg>
            <div className="absolute top-1 left-2 text-xs">🍓</div>
            <div className="absolute top-1 right-2 text-xs">🍓</div>
            {/* Recipient Name Inscription */}
            <span className="font-script font-extrabold text-xl sm:text-3xl text-pink-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] z-10 pt-2 flex items-center gap-1.5 whitespace-nowrap px-2">
              <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600 inline" />
              <span>{BIRTHDAY_CONFIG.recipient.name}</span>
              <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600 inline" />
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-pink-300 to-amber-300 border-t border-white/50" />
          </div>

          {/* MIDDLE TIER (2nd Tier) */}
          <div className="w-60 sm:w-80 h-22 sm:h-26 -mt-2 bg-gradient-to-r from-purple-300 via-pink-200 to-amber-200 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.6)] border-2 border-amber-200/90 flex flex-col items-center justify-center relative overflow-hidden z-0">
            <svg viewBox="0 0 320 30" className="absolute top-0 left-0 right-0 w-full h-6 fill-pink-100/90 drop-shadow-sm">
              <path d="M 0 0 L 0 18 Q 20 32 40 18 Q 60 4 80 18 Q 100 32 120 18 Q 140 4 160 18 Q 180 32 200 18 Q 220 4 240 18 Q 260 32 280 18 Q 300 4 320 18 L 320 0 Z" />
            </svg>
            <div className="absolute inset-x-0 h-4 bg-gradient-to-r from-pink-400/40 via-purple-400/40 to-pink-400/40 border-y border-amber-300/60 top-1/2 -translate-y-1/2" />
            <span className="font-display font-extrabold text-[11px] sm:text-sm tracking-[0.2em] text-purple-950 uppercase drop-shadow-[0_1px_2px_rgba(255,255,200,0.7)] z-10 pt-2 whitespace-nowrap">
              Happy Birthday 🎉
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-r from-amber-200 via-pink-200 to-amber-200 border-t border-amber-300/50" />
          </div>

          {/* BOTTOM TIER (3rd Base Tier) */}
          <div className="w-72 sm:w-96 h-24 sm:h-28 -mt-2 bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] border-2 border-amber-300/90 flex flex-col items-center justify-center relative overflow-hidden -z-10">
            <svg viewBox="0 0 380 35" className="absolute top-0 left-0 right-0 w-full h-7 fill-amber-200/90 drop-shadow-md">
              <path d="M 0 0 L 0 20 Q 23 38 47 20 Q 70 2 95 20 Q 118 38 142 20 Q 166 2 190 20 Q 213 38 237 20 Q 261 2 285 20 Q 308 38 332 20 Q 356 2 380 20 L 380 0 Z" />
            </svg>
            <div className="absolute z-10 text-xl top-5 sm:top-6">🎀</div>
            <span className="font-display font-extrabold text-[11px] sm:text-sm tracking-wider text-amber-950 uppercase pt-6 drop-shadow-sm">
              Tap Cake to Celebrate ({celebrationCount})
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 border-t border-amber-300/80" />
          </div>

          {/* GRAND GOLDEN PEDESTAL STAND */}
          <div className="w-80 sm:w-[28rem] h-10 sm:h-12 -mt-3 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 rounded-full shadow-[0_20px_50px_rgba(255,209,102,0.4)] border-4 border-amber-200 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-1/2" />
            <div className="w-full h-1 bg-amber-200/80 my-auto" />
          </div>
          <div className="w-64 sm:w-80 h-4 bg-amber-400/20 rounded-full blur-md -mt-1" />
        </motion.div>

        {/* Candle Controls */}
        <div className="mt-3 sm:mt-4 flex gap-4">
          <button
            onClick={toggleCandles}
            className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full glass-panel-gold text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-300 hover:text-slate-950 transition-all border border-amber-300/40 flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            {candlesLit ? (
              <>
                <Flame className="w-4 h-4 text-amber-300 animate-pulse" /> Blow Out Candles
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-emerald-300" /> Relight Candles
              </>
            )}
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="relative z-10 pt-2 pb-4 sm:pb-6">
        <button
          onClick={() => {
            soundEngine.playMagicChime();
            onNext();
          }}
          className="px-7 sm:px-8 py-3.5 rounded-full glass-panel-gold font-display font-semibold text-sm sm:text-base text-amber-200 hover:text-slate-900 hover:bg-amber-300 shadow-[0_0_25px_rgba(255,209,102,0.4)] transition-all border border-amber-300/40 flex items-center gap-3 active:scale-95 cursor-pointer"
        >
          <span>Watch Night Sky Butterfly Swarm</span>
          <span className="text-xl">🌙</span>
        </button>
      </div>
    </div>
  );
};
