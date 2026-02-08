import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { Sparkles, ArrowRight, X, CheckCircle2, Zap, Target, Users, TrendingUp, Lightbulb, BarChart } from 'lucide-react';
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
  const [step, setStep] = useState<'choice' | 'form' | 'templates'>('form');
  const [formData, setFormData] = useState({
    startupName: '',
    industry: '',
    description: '',
    stage: 'idea'
  });
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
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
    setIsGenerating(true);
    // Simulate AI template generation
    setTimeout(() => {
      setIsGenerating(false);
      setStep('templates');
    }, 2000);
  };

  const getSmartTemplates = () => {
    const templates = [
      {
        id: 'mvp-launch',
        title: 'MVP Launch Roadmap',
        description: `Complete roadmap to launch your ${formData.industry} MVP in 12 weeks`,
        icon: Zap,
        color: 'from-cyan-500 to-blue-600',
        tasks: 15,
        milestones: 4,
        recommended: formData.stage === 'idea' || formData.stage === 'mvp'
      },
      {
        id: 'product-market-fit',
        title: 'Product-Market Fit Framework',
        description: 'Validate your idea and find your ideal customers',
        icon: Target,
        color: 'from-purple-500 to-pink-600',
        tasks: 12,
        milestones: 3,
        recommended: formData.stage === 'idea' || formData.stage === 'launch'
      },
      {
        id: 'fundraising',
        title: 'Fundraising Preparation',
        description: 'Get investor-ready with pitch deck, financials, and strategy',
        icon: TrendingUp,
        color: 'from-green-500 to-emerald-600',
        tasks: 10,
        milestones: 3,
        recommended: formData.stage === 'growth' || formData.stage === 'scaling'
      },
      {
        id: 'team-building',
        title: 'Team Building & Culture',
        description: 'Build a strong founding team and company culture',
        icon: Users,
        color: 'from-orange-500 to-red-600',
        tasks: 8,
        milestones: 2,
        recommended: true
      },
      {
        id: 'growth-marketing',
        title: 'Growth & Marketing Plan',
        description: `Acquire first 1000 users for your ${formData.industry} startup`,
        icon: BarChart,
        color: 'from-indigo-500 to-purple-600',
        tasks: 14,
        milestones: 4,
        recommended: formData.stage === 'launch' || formData.stage === 'growth'
      },
      {
        id: 'innovation',
        title: 'Innovation & Experimentation',
        description: 'Rapid testing and iteration framework',
        icon: Lightbulb,
        color: 'from-yellow-500 to-orange-600',
        tasks: 9,
        milestones: 3,
        recommended: false
      }
    ];

    return templates.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
  };

  const toggleTemplate = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleCompleteOnboarding = () => {
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
        ) : step === 'form' ? (
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
                    className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  >
                    <option value="" style={{ backgroundColor: '#0a0e1a', color: '#9ca3af' }}>Select an industry</option>
                    <option value="saas" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>SaaS</option>
                    <option value="fintech" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>FinTech</option>
                    <option value="healthtech" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>HealthTech</option>
                    <option value="edtech" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>EdTech</option>
                    <option value="ecommerce" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>E-commerce</option>
                    <option value="ai" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>AI/ML</option>
                    <option value="other" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>Other</option>
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
                    className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  >
                    <option value="idea" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>Idea Stage</option>
                    <option value="mvp" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>Building MVP</option>
                    <option value="launch" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>Ready to Launch</option>
                    <option value="growth" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>Growth Stage</option>
                    <option value="scaling" style={{ backgroundColor: '#0a0e1a', color: '#ffffff' }}>Scaling</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Smart Templates...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        ) : step === 'templates' ? (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative z-10 w-full max-w-6xl"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.7 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">AI-Powered Templates for You</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Based on your {formData.industry} startup at {formData.stage.replace('-', ' ')} stage, we've curated these templates to accelerate your success
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {getSmartTemplates().map((template, index) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplates.includes(template.id);
                  return (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => toggleTemplate(template.id)}
                      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all group ${
                        isSelected 
                          ? 'bg-white/10 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                          : 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-white/10'
                      }`}
                    >
                      {template.recommended && (
                        <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-xs font-bold text-white shadow-lg">
                          Recommended
                        </div>
                      )}
                      
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </motion.div>
                      )}

                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        {template.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                        {template.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{template.tasks} tasks</span>
                        <span>•</span>
                        <span>{template.milestones} milestones</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCompleteOnboarding}
                  className="flex-1 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                >
                  Skip Templates
                </button>
                <button
                  onClick={handleCompleteOnboarding}
                  disabled={selectedTemplates.length === 0}
                  className="flex-1 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Apply {selectedTemplates.length > 0 ? `${selectedTemplates.length} Template${selectedTemplates.length > 1 ? 's' : ''}` : 'Selected'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
