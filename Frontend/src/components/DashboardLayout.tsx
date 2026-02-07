import React, { useState, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  ListTodo, 
  MessageSquare, 
  BarChart3, 
  Briefcase, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building2
} from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingShapes } from './FloatingShapes';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
  userName: string;
  userRole: 'leader' | 'team';
  startupName?: string;
}

export const DashboardLayout = ({
  children,
  currentSection,
  onNavigate,
  onLogout,
  userName,
  userRole,
  startupName = 'StartupOps'
}: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const leaderNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'tasks', label: 'Tasks', icon: ListTodo },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'investor-hub', label: 'Investor Hub', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const teamNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'tasks', label: 'My Tasks', icon: ListTodo },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const navItems = userRole === 'leader' ? leaderNavItems : teamNavItems;

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#02040a] text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dashboard Navbar - Matching Landing Page Style */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 py-4 bg-gradient-to-b from-[#02040a]/80 via-[#02040a]/60 to-transparent backdrop-blur-2xl"
        style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo with Mobile Menu */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white">
                S
              </div>
              <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {startupName}
              </span>
            </div>
          </div>

          {/* Centered Navigation Pill */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              {navItems.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full active:scale-95 ${
                    currentSection === item.id 
                      ? 'text-cyan-400 bg-white/15 backdrop-blur-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - User & Logout */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-400">{userName}</span>
            <button
              onClick={onLogout}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Animated Background */}
      <AnimatedBackground mouseX={mouseX} mouseY={mouseY} />
      <FloatingShapes mouseX={mouseX} mouseY={mouseY} count={4} />

      {/* Main Content - No Sidebar */}
      <div className="relative z-10 w-full">
        <motion.main 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-12 md:pb-20"
        >
          {children}
        </motion.main>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-40 bg-[#02040a]/95 backdrop-blur-xl pt-20"
            onClick={() => setMobileMenuOpen(false)}
          >
            <nav className="p-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 backdrop-blur-lg ${
                      isActive 
                        ? 'bg-white/15 text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10 hover:border hover:border-white/10 active:scale-98'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
