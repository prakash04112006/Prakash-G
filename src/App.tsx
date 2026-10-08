import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId } from './types';
import { CocoonLoader } from './components/CocoonLoader';
import { ButterflyCursor } from './components/ButterflyCursor';
import { Page1Intro } from './components/Pages/Page1Intro';
import { Page2HeroTree } from './components/Pages/Page2HeroTree';
import { Page6CakeCelebration } from './components/Pages/Page6CakeCelebration';
import { Page7FinalSwarm } from './components/Pages/Page7FinalSwarm';
import { Page8FinalNote } from './components/Pages/Page8FinalNote';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('loader');
  const [unlockedSecret, setUnlockedSecret] = useState(false);

  // Page Transition Handlers
  const handlePageSelect = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    const sequence: PageId[] = ['page1', 'page2', 'page6', 'page7', 'page8'];
    const idx = sequence.indexOf(currentPage);
    if (idx >= 0 && idx < sequence.length - 1) {
      setCurrentPage(sequence[idx + 1]);
    } else {
      setCurrentPage('page1');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setCurrentPage('page1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative font-sans overflow-x-hidden">
      {/* Interactive Butterfly Cursor & Particle Dust */}
      <ButterflyCursor />

      {/* Main Pages with Smooth Hardware-Accelerated Transitions */}
      <AnimatePresence mode="wait">
        {currentPage === 'loader' && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CocoonLoader onComplete={() => setCurrentPage('page1')} />
          </motion.div>
        )}

        {currentPage === 'page1' && (
          <motion.div
            key="page1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Page1Intro onNext={handleNextPage} />
          </motion.div>
        )}

        {currentPage === 'page2' && (
          <motion.div
            key="page2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Page2HeroTree onNext={handleNextPage} />
          </motion.div>
        )}

        {currentPage === 'page6' && (
          <motion.div
            key="page6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Page6CakeCelebration onNext={handleNextPage} />
          </motion.div>
        )}

        {currentPage === 'page7' && (
          <motion.div
            key="page7"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Page7FinalSwarm onNext={handleNextPage} />
          </motion.div>
        )}

        {currentPage === 'page8' && (
          <motion.div
            key="page8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Page8FinalNote onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
