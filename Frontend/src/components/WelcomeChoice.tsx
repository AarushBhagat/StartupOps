import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Users, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { auth } from '../lib/firebase';

interface WelcomeChoiceProps {
  onChooseCreate: () => void;
  onChooseJoin: () => void;
}

export const WelcomeChoice = ({ onChooseCreate, onChooseJoin }: WelcomeChoiceProps) => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/startup/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inviteCode: inviteCode.trim() })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to join team');
      }

      // Success! The AuthContext will automatically detect the updated user document
      // and update the app state, routing the user to the next screen.
      onChooseJoin();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Welcome to StartupOps
          </h1>
          <p className="text-xl text-gray-400 font-light">
            How would you like to get started?
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showJoinForm ? (
            <motion.div 
              key="choices"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Option 1: Create Startup */}
              <motion.button
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={onChooseCreate}
                className="p-8 rounded-3xl bg-[#0a0f1c]/80 border border-white/10 backdrop-blur-xl hover:border-cyan-500/50 hover:bg-white/[0.02] transition-all group text-left h-full flex flex-col shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Create New Startup</h2>
                <p className="text-gray-400 mb-8 flex-1 leading-relaxed">
                  Start fresh. Set up your company profile, answer a few questions, and let AI generate your complete roadmap and workspace.
                </p>
                <div className="flex items-center text-cyan-400 font-medium group-hover:translate-x-2 transition-transform">
                  Start Building <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </motion.button>

              {/* Option 2: Join Team */}
              <motion.button
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowJoinForm(true)}
                className="p-8 rounded-3xl bg-[#0a0f1c]/80 border border-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:bg-white/[0.02] transition-all group text-left h-full flex flex-col shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Join Existing Team</h2>
                <p className="text-gray-400 mb-8 flex-1 leading-relaxed">
                  Have an invite code from your founder? Enter it here to instantly link your account to their startup workspace.
                </p>
                <div className="flex items-center text-purple-400 font-medium group-hover:translate-x-2 transition-transform">
                  Enter Code <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              key="join-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto"
            >
              <div className="p-8 rounded-3xl bg-[#0a0f1c]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <button 
                  onClick={() => setShowJoinForm(false)}
                  className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to choices
                </button>

                <h3 className="text-2xl font-bold mb-2">Join Team</h3>
                <p className="text-gray-400 mb-8">Enter the unique code provided by your founder to join their workspace.</p>

                <form onSubmit={handleJoinSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Invite Code</label>
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      placeholder="e.g. A1B2C3D4"
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono text-lg tracking-widest text-center"
                      maxLength={8}
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || inviteCode.length < 4}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      'Join Workspace'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
