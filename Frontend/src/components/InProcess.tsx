import React from 'react';
import { motion } from 'motion/react';
import { Settings, CheckCircle, ArrowRight } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';

interface InProcessProps {
  userName: string;
  startupName: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const InProcess = ({ userName, startupName, onNavigate, onLogout }: InProcessProps) => {
  return (
    <DashboardLayout
      currentSection="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      userName={userName}
      userRole="team"
      startupName={startupName}
    >
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full p-10 md:p-16 rounded-3xl bg-[#0a0f1c]/80 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-8 border border-white/5 shadow-inner">
              <Settings className="w-12 h-12 text-cyan-400 animate-[spin_4s_linear_infinite]" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Workspace In Process</h1>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
              Welcome to <strong>{startupName}</strong>, {userName}! We are currently setting up your tailored workspace. Your founder is finalizing the roadmap and initial tasks.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm mb-10">
              <div className="flex items-center text-left p-4 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle className="w-5 h-5 text-emerald-400 mr-4 flex-shrink-0" />
                <span className="text-sm text-gray-300">Account linked to {startupName}</span>
              </div>
              <div className="flex items-center text-left p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-5 h-5 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mr-4 flex-shrink-0" />
                <span className="text-sm text-gray-300">Preparing dashboard modules</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('tasks')}
              className="group flex items-center px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-cyan-400 font-medium"
            >
              Check Tasks Anyway
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
