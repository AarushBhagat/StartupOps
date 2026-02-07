import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingShapes } from './FloatingShapes';

interface OnboardingProps {
  onComplete: (hasIdea: boolean, ideaData?: {
    startupName: string;
    industry: string;
    description: string;
    stage: string;
  }) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState<'choice' | 'form'>('choice');
  const [formData, setFormData] = useState({
    startupName: '',
    industry: '',
    description: '',
    stage: 'idea'
  });
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

  const handleLater = () => {
    onComplete(false);
  };

  const handleStartForm = () => {
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(true, formData);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#02040a] text-white flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <AnimatedBackground mouseX={mouseX} mouseY={mouseY} />
      
      {/* Floating Geometric Shapes */}
      <FloatingShapes mouseX={mouseX} mouseY={mouseY} count={4} />

      <AnimatePresence mode="wait">
        {step === 'choice' ? (
          <motion.div
            key="choice"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative z-10 w-full max-w-2xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">StartupOps</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">Let's get you set up for success</p>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartForm}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-4 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Tell us about your idea</h3>
                <p className="text-gray-400">Get personalized guidance and AI-powered insights</p>
                <div className="flex items-center gap-2 mt-4 text-cyan-400">
                  <span className="text-sm font-medium">Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLater}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">I'll do this later</h3>
                <p className="text-gray-400">Explore the dashboard and set up when ready</p>
                <div className="flex items-center gap-2 mt-4 text-gray-400">
                  <span className="text-sm font-medium">Skip for now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative z-10 w-full max-w-2xl"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Tell us about your startup</h2>
                <button
                  onClick={() => setStep('choice')}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Startup Name *</label>
                  <input
                    type="text"
                    value={formData.startupName}
                    onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                    placeholder="My Awesome Startup"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Industry *</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  >
                    <option value="">Select an industry</option>
                    <option value="saas">SaaS</option>
                    <option value="fintech">FinTech</option>
                    <option value="healthtech">HealthTech</option>
                    <option value="edtech">EdTech</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="ai">AI/ML</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Brief Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What problem are you solving? Who are your customers?"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Stage *</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  >
                    <option value="idea">Idea Stage</option>
                    <option value="mvp">Building MVP</option>
                    <option value="launch">Ready to Launch</option>
                    <option value="growth">Growth Stage</option>
                    <option value="scaling">Scaling</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300"
                >
                  Continue to Dashboard
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
