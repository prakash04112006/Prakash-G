import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { Maximize2, X } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { BIRTHDAY_GIRL_BASE64, BIRTHDAY_GIRL_URL } from '../../assets/imageData';

export const PhotoTribute: React.FC = () => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [imgSrc, setImgSrc] = useState(BIRTHDAY_GIRL_BASE64);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full flex flex-col items-center justify-center my-4 relative px-2"
    >
      {/* ROYAL GOLDEN FRAME CONTAINER */}
      <div className="relative group max-w-xs sm:max-w-md w-full px-2">
        {/* Soft Ambient Halo Behind Frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/25 via-amber-400/20 to-purple-600/25 rounded-3xl blur-2xl -z-10 group-hover:scale-105 transition-all duration-500 pointer-events-none" />

        {/* Outer Ornate Frame */}
        <div className="relative rounded-[2.2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#FAF0D7] via-[#D4AF37] to-[#8C6D1F] p-2.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-2 border-amber-200/80 transition-all duration-300">
          {/* Corner Embellishments */}
          <div className="absolute top-2 left-2 text-amber-900/80 text-lg sm:text-xl pointer-events-none">⚜️</div>
          <div className="absolute top-2 right-2 text-amber-900/80 text-lg sm:text-xl pointer-events-none">⚜️</div>
          <div className="absolute bottom-2 left-2 text-amber-900/80 text-lg sm:text-xl pointer-events-none">⚜️</div>
          <div className="absolute bottom-2 right-2 text-amber-900/80 text-lg sm:text-xl pointer-events-none">⚜️</div>

          {/* Inner Golden Bevel */}
          <div className="relative rounded-[1.8rem] sm:rounded-[2rem] bg-gradient-to-b from-[#1C0D26] to-[#0A0412] p-1.5 sm:p-2 border border-amber-300/60 shadow-inner overflow-hidden">
            {/* Image Container */}
            <div
              className="relative aspect-[3/4.4] sm:aspect-[3/4.5] rounded-[1.5rem] overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer select-none"
              onClick={() => {
                soundEngine.playMagicChime();
                setShowLightbox(true);
              }}
            >
              <img
                src={imgSrc}
                alt={BIRTHDAY_CONFIG.recipient.name}
                loading="eager"
                decoding="async"
                onError={() => {
                  if (imgSrc !== BIRTHDAY_GIRL_URL) {
                    setImgSrc(BIRTHDAY_GIRL_URL);
                  }
                }}
                className="w-full h-full object-cover object-center"
              />

              {/* Fullscreen icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 backdrop-blur-md text-amber-200 hover:text-white transition-all shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-800/90 text-pink-200 hover:text-white hover:bg-slate-700 transition-all cursor-pointer z-10"
              aria-label="Close photo"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-h-[85vh] max-w-md w-full rounded-3xl overflow-hidden border-2 border-amber-300/60 shadow-[0_0_50px_rgba(255,209,102,0.3)] bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imgSrc}
                alt={BIRTHDAY_CONFIG.recipient.name}
                loading="eager"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
