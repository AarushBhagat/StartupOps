import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Sparkles,
  Download,
  Share2,
  Eye,
  DollarSign,
  Users,
  Calendar,
  Upload,
  FileCheck,
  X,
  Copy,
  Send
} from 'lucide-react';

export const InvestorHubPage = () => {
  const [metricsEdit, setMetricsEdit] = useState(false);
  const [metrics, setMetrics] = useState({
    mrr: '0',
    users: '120',
    growth: '15',
    burn: '5000',
    runway: '6'
  });
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState('');

  const handleGeneratePitch = () => {
    setIsGeneratingPitch(true);
    
    // Simulate AI pitch generation
    setTimeout(() => {
      const pitch = `**The Problem**

The pet healthcare industry faces a critical challenge: pet owners struggle to maintain consistent preventive care, leading to expensive emergency treatments and reduced pet health outcomes. With 120 active users already experiencing this pain point, the demand for a comprehensive solution is clear.

**Our Solution**

We've built an intelligent platform that revolutionizes pet healthcare management. Our system combines:
• Real-time health tracking and alerts
• Veterinary telemedicine integration
• Automated appointment scheduling
• Personalized care recommendations powered by AI

**Market Opportunity**

The pet tech market is projected to reach $20B by 2027, growing at 25% annually. With over 85 million pet-owning households in the US alone, we're addressing a massive and growing market segment that prioritizes pet wellness.

**Traction & Progress**

• ${metrics.users} active users and growing at ${metrics.growth}% month-over-month
• Strong product-market fit validated through user feedback
• Strategic partnerships with 3 veterinary clinics established
• Platform stability and feature development on track

**Business Model**

Recurring revenue through subscription tiers:
• Basic: $9.99/month - Essential health tracking
• Premium: $24.99/month - Full telemedicine access
• Enterprise: Custom pricing for vet clinics

Current MRR: $${metrics.mrr} with proven unit economics

**The Team**

Our founding team brings deep expertise in:
• Healthcare technology and veterinary medicine
• Product development and user experience
• Growth marketing and customer success

Combined, we have 25+ years of experience building successful healthtech products.

**Go-to-Market Strategy**

Phase 1: Direct-to-consumer marketing through pet owner communities
Phase 2: B2B partnerships with veterinary clinics and pet insurance providers
Phase 3: International expansion starting with Canada and UK

**Financial Projections**

Year 1: $250K ARR with 2,000 users
Year 2: $1.2M ARR with 10,000 users
Year 3: $5M ARR with 45,000 users

Current burn rate: $${metrics.burn}/month
Runway: ${metrics.runway} months

**The Ask**

Seeking $500K seed funding to:
• Expand engineering team (40%)
• Scale marketing and user acquisition (35%)
• Enhance AI capabilities (15%)
• Operations and runway extension (10%)

This capital will take us to Series A milestones: 10K users and $1M ARR.

**Why Now?**

Post-pandemic pet ownership has surged, digital health adoption is mainstream, and pet owners are actively seeking solutions. We're positioned at the perfect intersection of market readiness and technological capability.

**Join Us**

We're building the future of pet healthcare. With your partnership, we can revolutionize how millions of pet owners care for their beloved companions while building a category-defining company.`;
      
      setGeneratedPitch(pitch);
      setIsGeneratingPitch(false);
      setShowPitchModal(true);
    }, 3000);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(generatedPitch.replace(/\*\*/g, ''));
  };

  const pitchScore = 67;
  const scoreItems = [
    { label: 'Problem statement defined', status: 'complete', icon: CheckCircle },
    { label: 'Solution articulated', status: 'complete', icon: CheckCircle },
    { label: 'Team profiles complete', status: 'complete', icon: CheckCircle },
    { label: 'Traction metrics missing', status: 'warning', icon: AlertCircle },
    { label: 'Competitive analysis not done', status: 'missing', icon: XCircle },
    { label: 'Financial projections needed', status: 'missing', icon: XCircle },
    { label: 'Customer testimonials (0/3)', status: 'missing', icon: XCircle },
  ];

  const dueDiligenceDocs = [
    { label: 'Cap table', status: 'missing' },
    { label: 'Financial statements (P&L, Cash flow)', status: 'missing' },
    { label: 'Pitch deck', status: 'complete' },
    { label: 'Product roadmap', status: 'missing' },
    { label: 'Customer contracts/LOIs', status: 'missing' },
    { label: 'IP/Patent documentation', status: 'missing' },
    { label: 'Team agreements', status: 'missing' },
    { label: 'Legal entity documents', status: 'missing' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-cyan-500 to-blue-600';
    if (score >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-orange-500 to-red-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 85) return 'Excellent! Ready for investors';
    if (score >= 70) return 'Good start!';
    if (score >= 50) return 'Keep improving';
    return 'Needs work';
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
          Investor Hub
        </h1>
        <p className="text-gray-400 text-lg">
          Track investor readiness and manage fundraising materials
        </p>
      </motion.div>

      {/* Pitch Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl mb-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
            <Target className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Pitch Score</h2>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Score Circle */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative w-48 h-48 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (553 * pitchScore) / 100 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="553"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <div className="text-5xl font-bold text-white leading-none">{pitchScore}</div>
                <div className="text-sm text-gray-400 leading-none">/ 100</div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="w-full min-w-0">
            <div className={`inline-block px-5 py-2.5 rounded-full bg-gradient-to-r ${getScoreColor(pitchScore)} bg-opacity-20 text-white font-medium mb-6`}>
              {getScoreText(pitchScore)}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-5">Complete these to reach 85+:</h3>
            <div className="space-y-3">
              {scoreItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      item.status === 'complete'
                        ? 'bg-green-500/10'
                        : item.status === 'warning'
                        ? 'bg-yellow-500/10'
                        : 'bg-red-500/10'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${
                      item.status === 'complete'
                        ? 'text-green-400'
                        : item.status === 'warning'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`} />
                    <span className="text-white flex-1">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
            >
              Auto-fill Missing Data
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Traction Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Traction Metrics
            </h3>
            {!metricsEdit && (
              <button
                onClick={() => setMetricsEdit(true)}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Edit
              </button>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2.5">Monthly Recurring Revenue (MRR)</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.mrr}
                  onChange={(e) => setMetrics({ ...metrics, mrr: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                  ${metrics.mrr}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2.5">Total Active Users</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.users}
                  onChange={(e) => setMetrics({ ...metrics, users: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                  {metrics.users}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2.5">Month-over-Month Growth (%)</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.growth}
                  onChange={(e) => setMetrics({ ...metrics, growth: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                  {metrics.growth}%
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2.5">Monthly Burn Rate</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.burn}
                  onChange={(e) => setMetrics({ ...metrics, burn: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                  ${metrics.burn}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2.5">Runway (Months)</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.runway}
                  onChange={(e) => setMetrics({ ...metrics, runway: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                  {metrics.runway} months
                </div>
              )}
            </div>

            {metricsEdit && (
              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMetricsEdit(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                >
                  Save Metrics
                </motion.button>
                <button
                  onClick={() => setMetricsEdit(false)}
                  className="px-6 py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Investor Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-6 h-6 text-purple-400" />
              Investor Dashboard Preview
            </h3>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-1">PetHealth AI</div>
              <div className="text-gray-400">AI-powered vet consultations</div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">Pre-Seed</span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">HealthTech</span>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-bold text-gray-400 mb-3">Traction</div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>• {metrics.users} active users</span>
                  <span className="text-green-400">+{metrics.growth}% MoM</span>
                </div>
                <div>• 3 milestones completed</div>
                <div>• 85% positive user feedback</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-bold text-gray-400 mb-2">Team</div>
              <div className="text-sm text-gray-300">5 members • 2 Engineers • 1 Designer</div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-bold text-gray-400 mb-2">Recent Activity</div>
              <div className="space-y-1 text-sm text-gray-300">
                <div>• Completed "User Research" milestone</div>
                <div>• 15 tasks completed this week</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Pitch</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Due Diligence Checklist */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-orange-400" />
            Due Diligence Checklist
          </h3>
          <span className="text-sm text-gray-400 font-medium">
            {dueDiligenceDocs.filter(d => d.status === 'complete').length}/{dueDiligenceDocs.length} complete
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {dueDiligenceDocs.map((doc, index) => (
            <motion.div
              key={doc.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className={`flex items-center justify-between p-4 rounded-xl ${
                doc.status === 'complete'
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                {doc.status === 'complete' ? (
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
                <span className={`${doc.status === 'complete' ? 'text-white font-medium' : 'text-gray-400'}`}>
                  {doc.label}
                </span>
              </div>
              {doc.status === 'missing' && (
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Document</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            <span>Generate Template</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Pitch Deck Generator */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Auto-Generate Pitch Deck</h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            Based on your data, we'll create a professional pitch deck with:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {['Problem', 'Solution', 'Traction & Metrics', 'Team', 'Roadmap', 'The Ask'].map((slide, index) => (
              <motion.div
                key={slide}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-2 text-gray-300"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
                  {index + 1}
                </div>
                <span>Slide {index + 1}: {slide}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          onClick={handleGeneratePitch}
          disabled={isGeneratingPitch}
          whileHover={{ scale: isGeneratingPitch ? 1 : 1.02, boxShadow: isGeneratingPitch ? "" : "0 0 30px rgba(168, 85, 247, 0.4)" }}
          whileTap={{ scale: isGeneratingPitch ? 1 : 0.98 }}
          className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-bold hover:from-purple-400 hover:to-pink-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGeneratingPitch ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Your Data...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>Generate Pitch Deck</span>
            </>
          )}
        </motion.button>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium mb-1">PetHealth_Pitch_Feb2026.pdf</div>
              <div className="text-sm text-gray-400">Generated 2 hours ago</div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <Download className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* AI Generated Pitch Modal */}
      <AnimatePresence>
        {showPitchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPitchModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl my-8 rounded-2xl bg-[#02040a] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col max-h-[70vh]"
            >
              {/* Header - Fixed */}
              <div className="flex items-start justify-between p-6 md:p-8 gap-4 border-b border-white/10 flex-shrink-0">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">AI-Generated Pitch</h2>
                  </div>
                  <p className="text-sm text-gray-400">Generated based on your startup progress and metrics</p>
                </div>
                <button
                  onClick={() => setShowPitchModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Pitch Content - Scrollable */}
              <div 
                className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#a855f7 transparent'
                }}
              >
                <div className="prose prose-invert max-w-none">
                  {generatedPitch.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={index} className="text-xl md:text-2xl font-bold text-white mt-6 mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    
                    if (paragraph.includes('•')) {
                      const lines = paragraph.split('\n');
                      return (
                        <div key={index} className="mb-4">
                          {lines.map((line, i) => {
                            if (line.startsWith('•')) {
                              return (
                                <div key={i} className="flex items-start gap-3 mb-2 text-gray-300">
                                  <span className="text-purple-400 mt-1">✓</span>
                                  <span className="flex-1">{line.replace('• ', '')}</span>
                                </div>
                              );
                            }
                            return <p key={i} className="text-gray-300 mb-2 leading-relaxed">{line}</p>;
                          })}
                        </div>
                      );
                    }
                    
                    return (
                      <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Actions - Fixed Footer */}
              <div className="p-6 md:p-8 border-t border-white/10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.button
                  onClick={handleCopyPitch}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-5 h-5" />
                  Copy to Clipboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold hover:from-purple-400 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Share with Team
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export PDF
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
