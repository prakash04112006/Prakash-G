import React from 'react';
import { motion } from 'motion/react';
import { PhotoTribute } from './PhotoTribute';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { soundEngine } from '../../utils/audio';
import { Heart } from 'lucide-react';

interface Page7Props {
  onNext: () => void;
}

export const Page7FinalSwarm: React.FC<Page7Props> = ({ onNext }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#0F051D] via-[#150727] to-[#090212] text-pink-100 overflow-hidden select-none px-6 py-10">
      {/* Celestial Moonlit Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-purple-900/20 to-transparent pointer-events-none" />

      {/* Header Title */}
      <div className="relative z-10 text-center max-w-xl pt-6">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200">
          Our Birthday Girl
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-pink-200/80 font-light">
          A special moment dedicated to you on your memorable day
        </p>
      </div>

      {/* Centered Frame-styled Portrait Tribute */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-center">
        <PhotoTribute />
      </div>

      {/* Closing Message & Action Buttons */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-script text-3xl sm:text-5xl text-amber-200 drop-shadow-[0_0_15px_rgba(255,209,102,0.8)]"
        >
          Thank you for spending time in this.
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-3 font-display font-bold text-2xl sm:text-4xl text-pink-100 flex items-center justify-center gap-2"
        >
          <span>Once again happy birthday {BIRTHDAY_CONFIG.recipient.shortName}!</span>
          <Heart className="w-6 h-6 fill-pink-500 text-pink-500 inline" />
        </motion.h3>

        {/* Action Button to Final Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 pb-6 flex items-center justify-center"
        >
          <button
            onClick={() => {
              soundEngine.playMagicChime();
              onNext();
            }}
            className="group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 text-slate-950 font-display font-semibold text-sm sm:text-base shadow-[0_0_30px_rgba(255,209,102,0.6)] hover:shadow-[0_0_45px_rgba(255,209,102,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>One Final Note For You</span>
            <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">💌</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

