import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  onGetStarted: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navigation = ({ onNavigate, onGetStarted, currentPage, setCurrentPage }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNavClick = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        onNavigate(sectionId);
      }, 100);
    } else {
      onNavigate(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white">
              S
            </div>
            <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              StartupOps
            </span>
          </button>

          {/* Desktop Links - Centered Pill */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md rounded-full px-8 py-3 border border-white/5">
             <div className="flex items-center gap-8">
                <button onClick={() => handleNavClick('home')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</button>
                <button onClick={() => handleNavClick('features')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</button>
                <button onClick={() => handleNavClick('success-stories')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Success Stories</button>
                <button onClick={() => setCurrentPage('plans')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</button>
                <button onClick={() => handleNavClick('about')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</button>
             </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage('login')}
              className="px-6 py-2.5 text-white text-sm font-medium hover:text-cyan-400 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onGetStarted}
              className="px-6 py-2.5 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-[#02040a] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold text-white">StartupOps</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-medium text-white">
              <button onClick={() => handleNavClick('home')} className="text-left">Home</button>
              <button onClick={() => handleNavClick('features')} className="text-left">Features</button>
              <button onClick={() => handleNavClick('success-stories')} className="text-left">Success Stories</button>
              <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('plans'); }} className="text-left">Pricing</button>
              <button onClick={() => handleNavClick('about')} className="text-left">About</button>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onGetStarted(); }}
                className="w-full py-4 rounded-full border border-white/20 text-white font-bold"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};