import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  LayoutGrid, 
  ListTodo, 
  Users2, 
  FileBarChart, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  Presentation,
  Rocket,
  Target,
  Plus,
  UserPlus,
  Calendar
} from 'lucide-react';
import { SplitText } from './SplitText';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingShapes } from './FloatingShapes';
import { InfiniteMarquee } from './InfiniteMarquee';

interface LeaderDashboardProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  userName?: string;
  hasStartupInfo: boolean;
  startupInfo?: {
    startupName: string;
    industry: string;
    description: string;
    stage: string;
  };
  onSetupStartup?: () => void;
}

export const LeaderDashboard = ({ 
  onLogout, 
  onNavigate, 
  userName = "Team Leader",
  hasStartupInfo,
  startupInfo,
  onSetupStartup
}: LeaderDashboardProps) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const stats = hasStartupInfo ? [
    { label: 'Active Tasks', value: '24', icon: ListTodo, color: 'from-cyan-500 to-blue-600' },
    { label: 'Completed', value: '156', icon: CheckCircle2, color: 'from-green-500 to-emerald-600' },
    { label: 'Team Members', value: '5', icon: Users2, color: 'from-purple-500 to-pink-600' },
    { label: 'Investor Score', value: '87%', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
  ] : [];

  const recentTasks = [
    { title: 'Update pitch deck with market analysis', status: 'in-progress', priority: 'high', due: '2 days', assignee: 'Sarah' },
    { title: 'Complete financial projections Q1-Q4', status: 'pending', priority: 'high', due: '5 days', assignee: 'Michael' },
    { title: 'Conduct competitor research', status: 'completed', priority: 'medium', due: 'Done', assignee: 'Alex' },
    { title: 'Draft team expansion plan', status: 'in-progress', priority: 'medium', due: '1 week', assignee: 'You' }
  ];

  const nextSteps = [
    { title: 'Define your target market', description: 'Identify your ideal customer profile and market size', done: true },
    { title: 'Build financial model', description: 'Create projections for the next 3-5 years', done: true },
    { title: 'Invite team members', description: 'Add your co-founders and key team members', done: false },
    { title: 'Complete pitch deck', description: 'Finalize all slides with our AI assistance', done: false }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-cyan-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#02040a] text-white relative overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <AnimatedBackground mouseX={mouseX} mouseY={mouseY} variant="dashboard" />
      
      {/* Floating Geometric Shapes */}
      <FloatingShapes mouseX={mouseX} mouseY={mouseY} count={5} />

      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 bg-transparent"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                S
              </div>
              <span className="text-lg md:text-xl font-bold text-white tracking-tight hidden sm:block" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                StartupOps
              </span>
            </button>

            {/* Centered Pill Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full px-6 py-2.5 border border-white/10">
              <div className="flex items-center gap-6">
                <button onClick={() => setCurrentSection('dashboard')} className={`text-sm font-medium flex items-center gap-2 ${currentSection === 'dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  <LayoutGrid className="w-4 h-4" />
                  Dashboard
                </button>
                <button onClick={() => setCurrentSection('tasks')} className={`text-sm font-medium flex items-center gap-2 ${currentSection === 'tasks' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  <ListTodo className="w-4 h-4" />
                  Tasks
                </button>
                <button onClick={() => setCurrentSection('team')} className={`text-sm font-medium flex items-center gap-2 ${currentSection === 'team' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  <Users2 className="w-4 h-4" />
                  Team
                </button>
                <button onClick={() => setCurrentSection('pitch')} className={`text-sm font-medium flex items-center gap-2 ${currentSection === 'pitch' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  <Presentation className="w-4 h-4" />
                  Pitch Deck
                </button>
                <button onClick={() => setCurrentSection('analytics')} className={`text-sm font-medium flex items-center gap-2 ${currentSection === 'analytics' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  <FileBarChart className="w-4 h-4" />
                  Analytics
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* User Profile Button */}
              <div className="flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-md rounded-full px-3 md:px-4 py-2 border border-white/10">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-xs md:text-sm">
                  {userName.charAt(0)}
                </div>
                <span className="text-xs md:text-sm font-medium hidden sm:block">{userName}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 md:p-2.5 rounded-full border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-20">
        <AnimatePresence mode="wait">
          {!hasStartupInfo ? (
            // Empty State
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-8"
              >
                <Rocket className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Welcome to StartupOps!</h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
                Ready to turn your vision into reality? Let's set up your startup and get you on the path to success.
              </p>

              <button
                onClick={onSetupStartup}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Set Up Your Startup
              </button>

              {/* Infinite Scrolling Features Marquee */}
              <div className="mt-12 w-full max-w-6xl">
                <p className="text-center text-sm font-medium text-gray-400 tracking-[0.2em] uppercase mb-8">
                  Everything You Need to Succeed
                </p>
                <InfiniteMarquee 
                  items={[
                    "🎯 AI Task Generation",
                    "👥 Team Collaboration",
                    "📊 Investor Dashboard",
                    "📈 Analytics & Insights",
                    "🎨 Pitch Deck Builder",
                    "💰 Funding Tracker",
                    "🚀 Launch Planning",
                    "📝 Smart Documentation",
                    "🔔 Progress Alerts",
                    "⚡ Quick Actions"
                  ]}
                  speed={35}
                  pauseOnHover={true}
                />
              </div>

              <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <Target className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="font-bold mb-2">AI-Powered Tasks</h3>
                  <p className="text-sm text-gray-400">Get intelligent task suggestions based on your startup stage</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <Users2 className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="font-bold mb-2">Team Collaboration</h3>
                  <p className="text-sm text-gray-400">Work together seamlessly with your co-founders</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <Presentation className="w-8 h-8 text-pink-400 mb-4" />
                  <h3 className="font-bold mb-2">Pitch Deck Builder</h3>
                  <p className="text-sm text-gray-400">Create investor-ready presentations with AI</p>
                </div>
              </div>
            </motion.div>
          ) : (
            // Dashboard with Content
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 md:mb-12"
              >
                <SplitText 
                  text={`${startupInfo?.startupName || 'Your Startup'} 🚀`}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 tracking-tighter"
                  delay={0}
                  duration={0.05}
                />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-gray-400"
                >
                  Here's your progress today.
                </motion.p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 300 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 hover:border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    <motion.div 
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 md:mb-4`}
                    >
                      <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                    <p className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                {/* Next Steps */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-6">Your Roadmap to Success</h2>
                  <div className="space-y-4">
                    {nextSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                          step.done 
                            ? 'bg-green-500/5 border-green-500/20' 
                            : 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${step.done ? 'bg-green-500/20' : 'bg-cyan-500/20'}`}>
                          {step.done ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Target className="w-5 h-5 text-cyan-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold mb-1 ${step.done ? 'line-through text-gray-500' : ''}`}>{step.title}</h3>
                          <p className="text-sm text-gray-400">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold">Team Tasks</h2>
                    <button 
                      onClick={() => setCurrentSection('tasks')}
                      className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-cyan-400" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentTasks.map((task, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ 
                          scale: 1.02,
                          x: 5,
                          boxShadow: "0 10px 30px rgba(6, 182, 212, 0.15)"
                        }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3 flex-1">
                            {getStatusIcon(task.status)}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm mb-1 truncate">{task.title}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>{task.assignee}</span>
                                <span>•</span>
                                <span>Due: {task.due}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                            task.priority === 'high' 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentSection('tasks')}
                    className="w-full mt-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium text-sm"
                  >
                    View All Tasks
                  </button>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
              >
                <motion.button 
                  onClick={() => setCurrentSection('pitch')}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all text-left"
                >
                  <Presentation className="w-8 h-8" />
                  <div>
                    <p className="font-bold mb-1">Generate Pitch Deck</p>
                    <p className="text-sm text-gray-400">AI-powered presentations</p>
                  </div>
                </motion.button>
                <motion.button 
                  onClick={() => setCurrentSection('team')}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 rounded-2xl border border-white/10 text-white hover:bg-white/5 transition-colors text-left"
                >
                  <UserPlus className="w-8 h-8" />
                  <div>
                    <p className="font-bold mb-1">Invite Team Members</p>
                    <p className="text-sm text-gray-400">Collaborate together</p>
                  </div>
                </motion.button>
                <motion.button 
                  onClick={() => setCurrentSection('analytics')}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 rounded-2xl border border-white/10 text-white hover:bg-white/5 transition-colors text-left"
                >
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <p className="font-bold mb-1">View Analytics</p>
                    <p className="text-sm text-gray-400">Track your progress</p>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};