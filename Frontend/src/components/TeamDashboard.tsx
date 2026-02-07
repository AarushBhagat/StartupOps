import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  LayoutGrid, 
  ListTodo, 
  FileBarChart, 
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  Calendar,
  MessageSquare,
  Bell
} from 'lucide-react';
import { SplitText } from './SplitText';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingShapes } from './FloatingShapes';

interface TeamDashboardProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  userName?: string;
}

export const TeamDashboard = ({ 
  onLogout, 
  onNavigate, 
  userName = "Team Member"
}: TeamDashboardProps) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
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

  const myTasks = [
    { title: 'Review Q4 financial model', status: 'in-progress', priority: 'high', due: 'Today', progress: 60 },
    { title: 'Update market research slides', status: 'in-progress', priority: 'high', due: 'Tomorrow', progress: 30 },
    { title: 'Complete competitor analysis', status: 'pending', priority: 'medium', due: '3 days', progress: 0 },
    { title: 'Draft product roadmap', status: 'pending', priority: 'medium', due: '5 days', progress: 0 }
  ];

  const completedTasks = [
    { title: 'Set up analytics dashboard', completedDate: 'Today' },
    { title: 'Customer interview #5', completedDate: 'Yesterday' },
    { title: 'Draft blog post for launch', completedDate: '2 days ago' }
  ];

  const stats = [
    { label: 'Assigned Tasks', value: '8', color: 'from-cyan-500 to-blue-600' },
    { label: 'Completed', value: '24', color: 'from-green-500 to-emerald-600' },
    { label: 'In Progress', value: '4', color: 'from-orange-500 to-red-600' }
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
                  My Tasks
                </button>
                <button onClick={() => setCurrentSection('calendar')} className={`text-sm font-medium flex items-center gap-2 ${currentSection === 'calendar' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  <Calendar className="w-4 h-4" />
                  Calendar
                </button>
                <button onClick={() => setCurrentSection('messages')} className={`text-sm font-medium flex items-center gap-2 ${currentSection === 'messages' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-full border border-white/10 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Profile Button */}
              <div className="flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-md rounded-full px-3 md:px-4 py-2 border border-white/10">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center font-bold text-xs md:text-sm">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <SplitText
            text={`Welcome back, ${userName.split(' ')[0]}! 👋`}
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
            Here's what you're working on today.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
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
              <p className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* My Tasks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6">My Active Tasks</h2>
            <div className="space-y-4">
              {myTasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 5,
                    boxShadow: "0 10px 30px rgba(6, 182, 212, 0.15)"
                  }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 300 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(task.status)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1">{task.title}</h3>
                        <p className="text-xs text-gray-400">Due: {task.due}</p>
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
                  
                  {/* Progress Bar */}
                  {task.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <button 
              onClick={() => setCurrentSection('tasks')}
              className="w-full mt-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium"
            >
              View All Tasks
            </button>
          </motion.div>

          {/* Sidebar - Recently Completed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Recently Completed */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Recently Completed</h2>
              <div className="space-y-3">
                {completedTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1">{task.title}</h3>
                      <p className="text-xs text-gray-400">{task.completedDate}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Team Updates */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">Team Updates</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-xs">
                    S
                  </div>
                  <div>
                    <p className="text-sm mb-1"><span className="font-medium">Sarah</span> completed pitch deck</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <div>
                    <p className="text-sm mb-1"><span className="font-medium">Michael</span> shared financial model</p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <div>
                    <p className="text-sm mb-1"><span className="font-medium">Alex</span> uploaded market research</p>
                    <p className="text-xs text-gray-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 md:mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-2xl p-6 md:p-8 text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-2">Keep up the great work! 🎉</h3>
          <p className="text-gray-400 mb-4">You've completed 8 tasks this week. The team is counting on you!</p>
          <motion.button 
            onClick={() => setCurrentSection('tasks')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
          >
            View My Tasks
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};