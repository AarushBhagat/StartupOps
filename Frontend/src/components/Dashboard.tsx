import React from 'react';
import { motion } from 'motion/react';
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
  Home,
  Presentation,
  Rocket,
  Target,
  Users
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  userName?: string;
}

export const Dashboard = ({ onLogout, onNavigate, userName = "John Doe" }: DashboardProps) => {
  const stats = [
    { label: 'Active Tasks', value: '24', icon: ListTodo, color: 'from-cyan-500 to-blue-600' },
    { label: 'Completed', value: '156', icon: CheckCircle2, color: 'from-green-500 to-emerald-600' },
    { label: 'Team Members', value: '8', icon: Users2, color: 'from-purple-500 to-pink-600' },
    { label: 'Investor Score', value: '87%', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
  ];

  const recentTasks = [
    { title: 'Update pitch deck', status: 'in-progress', priority: 'high', due: '2 days' },
    { title: 'Financial projections', status: 'pending', priority: 'high', due: '5 days' },
    { title: 'Market research', status: 'completed', priority: 'medium', due: 'Done' },
    { title: 'Team hiring plan', status: 'in-progress', priority: 'medium', due: '1 week' }
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
    <div className="min-h-screen bg-[#02040a] text-white relative overflow-hidden">
      {/* Animated Background - Same as other pages */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/30 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 py-6 bg-transparent"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white">
              S
            </div>
            <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              StartupOps
            </span>
          </button>

          {/* Centered Pill Navigation */}
          <div className="hidden md:flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full px-8 py-3 border border-white/10">
             <div className="flex items-center gap-8">
                <button onClick={() => {}} className="text-sm font-medium text-white flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Dashboard
                </button>
                <button onClick={() => {}} className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  Tasks
                </button>
                <button onClick={() => {}} className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Users2 className="w-4 h-4" />
                  Team
                </button>
                <button onClick={() => {}} className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Presentation className="w-4 h-4" />
                  Pitch Deck
                </button>
                <button onClick={() => {}} className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FileBarChart className="w-4 h-4" />
                  Analytics
                </button>
             </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* User Profile Button */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-sm">
                {userName.charAt(0)}
              </div>
              <span className="text-sm font-medium">{userName}</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2.5 rounded-full border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tighter">Welcome back, {userName.split(' ')[0]}! 👋</h1>
          <p className="text-xl text-gray-400">Here's what's happening with your startup today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Tasks</h2>
            <div className="space-y-4">
              {recentTasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-400">Due: {task.due}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium">
              View All Tasks
            </button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                <Rocket className="w-6 h-6" />
                <div className="text-left flex-1">
                  <p className="font-bold">Generate Pitch Deck</p>
                  <p className="text-sm text-gray-400">AI-powered deck creation</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
                <Target className="w-6 h-6" />
                <div className="text-left flex-1">
                  <p className="font-bold">Create New Task</p>
                  <p className="text-sm text-gray-400">Add to your roadmap</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
                <Users className="w-6 h-6" />
                <div className="text-left flex-1">
                  <p className="font-bold">Invite Team Member</p>
                  <p className="text-sm text-gray-400">Collaborate together</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
                <TrendingUp className="w-6 h-6" />
                <div className="text-left flex-1">
                  <p className="font-bold">View Analytics</p>
                  <p className="text-sm text-gray-400">Track your progress</p>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* AI Insights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-2xl p-8 text-center"
        >
          <Rocket className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
          <h3 className="text-2xl font-bold mb-2">Ready to get funded?</h3>
          <p className="text-gray-400 mb-4">Your investor readiness score is 87%. Complete 3 more tasks to reach 95%!</p>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all">
            View Recommendations
          </button>
        </motion.div>
      </main>
    </div>
  );
};