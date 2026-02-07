import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  onGetStarted: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated?: boolean;
}

export const Navigation = ({ onNavigate, onGetStarted, currentPage, setCurrentPage, isAuthenticated = false }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll with useEffect instead of useMotionValueEvent to avoid constructor issues
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentPage !== 'home' ? 'py-4 bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}
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
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-lg">
             <div className="flex items-center gap-2">
                <button onClick={() => handleNavClick('home')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 hover:backdrop-blur-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95">Home</button>
                <button onClick={() => handleNavClick('features')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 hover:backdrop-blur-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95">Features</button>
                <button onClick={() => handleNavClick('success-stories')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 hover:backdrop-blur-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95">Success Stories</button>
                <button onClick={() => setCurrentPage('plans')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 hover:backdrop-blur-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95">Pricing</button>
                <button onClick={() => handleNavClick('about')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 hover:backdrop-blur-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95">About</button>
             </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-purple-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-95"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="px-6 py-2.5 text-white text-sm font-medium hover:text-cyan-400 transition-all duration-300 rounded-full hover:bg-white/10 hover:backdrop-blur-lg active:scale-95"
                >
                  Sign In
                </button>
                <button 
                  onClick={onGetStarted}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 active:scale-95"
                >
                  Get Started
                </button>
              </>
            )}
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
              <button onClick={() => handleNavClick('home')} className="text-left px-4 py-3 rounded-lg hover:bg-white/10 hover:backdrop-blur-lg transition-all duration-300 active:scale-98">Home</button>
              <button onClick={() => handleNavClick('features')} className="text-left px-4 py-3 rounded-lg hover:bg-white/10 hover:backdrop-blur-lg transition-all duration-300 active:scale-98">Features</button>
              <button onClick={() => handleNavClick('success-stories')} className="text-left px-4 py-3 rounded-lg hover:bg-white/10 hover:backdrop-blur-lg transition-all duration-300 active:scale-98">Success Stories</button>
              <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('plans'); }} className="text-left px-4 py-3 rounded-lg hover:bg-white/10 hover:backdrop-blur-lg transition-all duration-300 active:scale-98">Pricing</button>
              <button onClick={() => handleNavClick('about')} className="text-left px-4 py-3 rounded-lg hover:bg-white/10 hover:backdrop-blur-lg transition-all duration-300 active:scale-98">About</button>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              {isAuthenticated ? (
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('dashboard'); }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-95"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('login'); }}
                    className="w-full py-4 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-bold transition-all duration-300 active:scale-95"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); onGetStarted(); }}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-95"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};