import React from 'react';
import { motion } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { soundEngine } from '../../utils/audio';
import { RotateCcw, Sparkles } from 'lucide-react';

interface Page8Props {
  onReplay: () => void;
  onBack?: () => void;
}

export const Page8FinalNote: React.FC<Page8Props> = ({ onReplay }) => {
  const note = BIRTHDAY_CONFIG.personalNote;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#0F041D] via-[#1A072A] to-[#0A0214] text-pink-100 overflow-hidden select-none px-4 sm:px-6 py-10">
      {/* Soft Ambient Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/10 via-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Floating Sparkle Particles in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Top Subtle Breadcrumb / Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center pt-2"
      >
        <span className="px-4 py-1.5 rounded-full glass-panel-gold text-amber-200/90 text-xs sm:text-sm font-medium tracking-widest uppercase border border-amber-300/30 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(255,209,102,0.2)]">
          <span>💌</span>
          <span>A Heartfelt Note</span>
          <span>✨</span>
        </span>
      </motion.div>

      {/* Elegant Letter / Note Parchment Container */}
      <div className="relative z-10 w-full max-w-2xl my-6 sm:my-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-b from-slate-900/90 via-[#1C0D2E]/85 to-[#130522]/95 backdrop-blur-2xl border border-amber-300/35 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(255,209,102,0.15)] overflow-hidden"
        >
          {/* Subtle Golden Glowing Border Shimmer */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Note Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-pink-200 to-amber-200 drop-shadow-[0_2px_15px_rgba(255,209,102,0.35)] leading-snug"
          >
            {note.title}
          </motion.h2>

          {/* Delicate Divider */}
          <div className="flex items-center justify-center gap-3 my-5 sm:my-7 opacity-70">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-300/60" />
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-300/60" />
          </div>

          {/* Note Paragraphs */}
          <div className="space-y-4 sm:space-y-6 text-pink-50/95 font-light leading-relaxed tracking-wide text-sm sm:text-base md:text-lg">
            {note.paragraphs.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 + index * 0.18 }}
                className={`leading-relaxed ${
                  index === note.paragraphs.length - 1
                    ? 'font-medium text-amber-200/95 pt-1'
                    : 'text-pink-100/90'
                }`}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Sign-off Closing */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8 sm:mt-10 pt-4 border-t border-amber-300/20 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3"
          >
            <div className="hidden sm:block">
              <span className="text-xs font-mono text-pink-300/50 tracking-wider">
                A warm memory that stays ✨
              </span>
            </div>
            <div className="font-script font-bold text-2xl sm:text-3xl text-amber-300 drop-shadow-[0_0_15px_rgba(255,209,102,0.5)]">
              {note.closing}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Replay Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 flex items-center justify-center w-full max-w-md pb-4"
      >
        <button
          onClick={() => {
            soundEngine.playMagicChime();
            onReplay();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 text-slate-950 font-display font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(255,209,102,0.6)] hover:shadow-[0_0_40px_rgba(255,209,102,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Journey From Start</span>
        </button>
      </motion.div>
    </div>
  );
};
